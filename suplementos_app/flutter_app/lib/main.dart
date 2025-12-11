import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'core/network/api_client.dart';
import 'data/datasources/local_storage_datasource.dart';
import 'data/datasources/auth_remote_datasource.dart';
import 'data/datasources/supplements_remote_datasource.dart';
import 'data/datasources/intakes_remote_datasource.dart';
import 'presentation/auth/bloc/auth_bloc.dart';
import 'presentation/auth/bloc/auth_event.dart';
import 'presentation/app.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Inicializar SharedPreferences
  final sharedPreferences = await SharedPreferences.getInstance();
  
  // Inicializar datasources
  final localStorage = LocalStorageDataSource(sharedPreferences);
  final apiClient = ApiClient(localStorage);
  final authDataSource = AuthRemoteDataSource(apiClient, localStorage);
  final supplementsDataSource = SupplementsRemoteDataSource(apiClient);
  final intakesDataSource = IntakesRemoteDataSource(apiClient);
  
  // Inicializar AuthBloc
  final authBloc = AuthBloc(authDataSource, localStorage);
  
  // Verificar estado de autenticación
  authBloc.add(AuthCheckStatusEvent());
  
  runApp(
    SupplementTrackerApp(
      authBloc: authBloc,
      authDataSource: authDataSource,
      supplementsDataSource: supplementsDataSource,
      intakesDataSource: intakesDataSource,
      localStorage: localStorage,
    ),
  );
}
