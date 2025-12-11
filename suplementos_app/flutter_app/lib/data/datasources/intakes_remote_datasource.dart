import '../../core/network/api_client.dart';
import '../../core/constants/api_constants.dart';
import '../models/intake_model.dart';
import '../models/streak_model.dart';

/// Data source remoto para tomas
class IntakesRemoteDataSource {
  final ApiClient _apiClient;
  
  IntakesRemoteDataSource(this._apiClient);
  
  /// Registra una nueva toma
  Future<IntakeModel> createIntake({
    required String userSupplementId,
    DateTime? takenAt,
  }) async {
    final response = await _apiClient.post(
      ApiConstants.intakes,
      data: {
        'userSupplementId': userSupplementId,
        'takenAt': (takenAt ?? DateTime.now()).toIso8601String(),
      },
    );
    
    return IntakeModel.fromJson(response.data);
  }
  
  /// Obtiene las tomas de hoy
  Future<List<IntakeModel>> getIntakesToday() async {
    final response = await _apiClient.get(ApiConstants.intakesToday);
    
    final List<dynamic> data = response.data as List<dynamic>;
    return data.map((json) => IntakeModel.fromJson(json)).toList();
  }
  
  /// Obtiene el progreso de hoy
  Future<Map<String, dynamic>> getProgressToday() async {
    final response = await _apiClient.get(ApiConstants.intakesProgressToday);
    return response.data as Map<String, dynamic>;
  }
  
  /// Obtiene las estadísticas de un suplemento
  Future<Map<String, dynamic>> getSupplementStats(String supplementId) async {
    final response = await _apiClient.get(
      '${ApiConstants.intakes}/stats/$supplementId',
    );
    return response.data as Map<String, dynamic>;
  }
  
  /// Obtiene la racha del usuario
  Future<StreakModel> getUserStreak() async {
    final response = await _apiClient.get(ApiConstants.streaksUser);
    return StreakModel.fromJson(response.data);
  }
  
  /// Obtiene la racha de un suplemento específico
  Future<StreakModel> getSupplementStreak(String supplementId) async {
    final response = await _apiClient.get(
      '${ApiConstants.streaksSupplement}/$supplementId',
    );
    return StreakModel.fromJson(response.data);
  }
}
