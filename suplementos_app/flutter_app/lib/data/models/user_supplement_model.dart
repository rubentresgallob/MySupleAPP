import '../../domain/entities/user_supplement.dart';

/// Modelo de suplemento del usuario para serialización JSON
class UserSupplementModel extends UserSupplement {
  const UserSupplementModel({
    required super.id,
    required super.userId,
    super.supplementDatabaseId,
    required super.name,
    required super.form,
    required super.dosageAmount,
    required super.dosageUnit,
    required super.timesPerDay,
    required super.schedules,
    required super.active,
    required super.createdAt,
  });
  
  /// Crea un UserSupplementModel desde JSON
  factory UserSupplementModel.fromJson(Map<String, dynamic> json) {
    return UserSupplementModel(
      id: json['id'] as String,
      userId: json['userId'] as String,
      supplementDatabaseId: json['supplementDatabaseId'] as String?,
      name: json['customName'] as String? ?? json['name'] as String,
      form: json['form'] as String,
      dosageAmount: (json['dosageAmount'] as num).toDouble(),
      dosageUnit: json['dosageUnit'] as String,
      timesPerDay: json['timesPerDay'] as int,
      schedules: (json['schedules'] as List<dynamic>)
          .map((e) => e as String)
          .toList(),
      active: json['active'] as bool,
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }
  
  /// Convierte el UserSupplementModel a JSON
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'userId': userId,
      'supplementDatabaseId': supplementDatabaseId,
      'customName': name,
      'form': form,
      'dosageAmount': dosageAmount,
      'dosageUnit': dosageUnit,
      'timesPerDay': timesPerDay,
      'schedules': schedules,
      'active': active,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}
