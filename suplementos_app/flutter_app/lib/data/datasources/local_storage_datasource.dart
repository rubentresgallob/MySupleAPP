import 'package:shared_preferences/shared_preferences.dart';
import '../../core/constants/app_constants.dart';

/// Data source para almacenamiento local
class LocalStorageDataSource {
  final SharedPreferences _prefs;
  
  LocalStorageDataSource(this._prefs);
  
  /// Guarda el token JWT
  Future<void> saveToken(String token) async {
    await _prefs.setString(AppConstants.tokenKey, token);
  }
  
  /// Obtiene el token JWT
  Future<String?> getToken() async {
    return _prefs.getString(AppConstants.tokenKey);
  }
  
  /// Elimina el token JWT
  Future<void> deleteToken() async {
    await _prefs.remove(AppConstants.tokenKey);
  }
  
  /// Verifica si el usuario está autenticado
  Future<bool> isAuthenticated() async {
    final token = await getToken();
    return token != null && token.isNotEmpty;
  }
  
  /// Guarda el ID del usuario
  Future<void> saveUserId(String userId) async {
    await _prefs.setString(AppConstants.userIdKey, userId);
  }
  
  /// Obtiene el ID del usuario
  Future<String?> getUserId() async {
    return _prefs.getString(AppConstants.userIdKey);
  }
  
  /// Guarda el nombre de usuario
  Future<void> saveUsername(String username) async {
    await _prefs.setString(AppConstants.usernameKey, username);
  }
  
  /// Obtiene el nombre de usuario
  Future<String?> getUsername() async {
    return _prefs.getString(AppConstants.usernameKey);
  }
  
  /// Limpia todos los datos del usuario (logout)
  Future<void> clearUserData() async {
    await _prefs.remove(AppConstants.tokenKey);
    await _prefs.remove(AppConstants.userIdKey);
    await _prefs.remove(AppConstants.usernameKey);
  }
}
