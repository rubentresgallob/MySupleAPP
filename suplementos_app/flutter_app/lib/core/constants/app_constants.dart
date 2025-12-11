import 'package:flutter/material.dart';

/// Constantes de la aplicación
class AppConstants {
  // Colores principales
  static const Color primaryColor = Color(0xFF2196F3);
  static const Color accentColor = Color(0xFF4CAF50);
  static const Color errorColor = Color(0xFFE53935);
  static const Color successColor = Color(0xFF43A047);
  static const Color warningColor = Color(0xFFFFA726);
  
  // Colores de gamificación
  static const Color streakColor = Color(0xFFFF6F00);
  static const Color goldColor = Color(0xFFFFD700);
  static const Color silverColor = Color(0xFFC0C0C0);
  static const Color bronzeColor = Color(0xFFCD7F32);
  
  // Textos
  static const String appName = 'Suplementos Tracker';
  static const String disclaimer = 'La responsabilidad sobre el uso y legalidad del suplemento recae en el usuario. Consulta siempre con un profesional sanitario.';
  
  // Storage keys
  static const String tokenKey = 'auth_token';
  static const String userIdKey = 'user_id';
  static const String usernameKey = 'username';
}
