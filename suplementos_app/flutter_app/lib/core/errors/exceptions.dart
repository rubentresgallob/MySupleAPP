/// Excepción de servidor
class ServerException implements Exception {
  final String message;
  ServerException(this.message);
}

/// Excepción de red
class NetworkException implements Exception {
  final String message;
  NetworkException(this.message);
}

/// Excepción de autenticación
class AuthException implements Exception {
  final String message;
  AuthException(this.message);
}

/// Excepción de validación
class ValidationException implements Exception {
  final String message;
  ValidationException(this.message);
}

/// Excepción de no encontrado
class NotFoundException implements Exception {
  final String message;
  NotFoundException(this.message);
}
