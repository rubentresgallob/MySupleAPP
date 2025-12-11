import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import '../core/constants/app_constants.dart';
import '../data/datasources/auth_remote_datasource.dart';
import '../data/datasources/supplements_remote_datasource.dart';
import '../data/datasources/intakes_remote_datasource.dart';
import '../data/datasources/local_storage_datasource.dart';
import 'auth/bloc/auth_bloc.dart';
import 'auth/bloc/auth_state.dart';
import 'auth/pages/login_page.dart';
import 'home/pages/home_page.dart';
import 'home/bloc/home_bloc.dart';

/// Aplicación principal
class SupplementTrackerApp extends StatelessWidget {
  final AuthBloc authBloc;
  final AuthRemoteDataSource authDataSource;
  final SupplementsRemoteDataSource supplementsDataSource;
  final IntakesRemoteDataSource intakesDataSource;
  final LocalStorageDataSource localStorage;
  
  const SupplementTrackerApp({
    super.key,
    required this.authBloc,
    required this.authDataSource,
    required this.supplementsDataSource,
    required this.intakesDataSource,
    required this.localStorage,
  });
  
  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider.value(value: authBloc),
        BlocProvider(
          create: (context) => HomeBloc(
            supplementsDataSource,
            intakesDataSource,
          ),
        ),
      ],
      child: MaterialApp(
        title: AppConstants.appName,
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(
            seedColor: AppConstants.primaryColor,
            secondary: AppConstants.accentColor,
          ),
          textTheme: GoogleFonts.interTextTheme(),
          cardTheme: CardTheme(
            elevation: 2,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
          elevatedButtonTheme: ElevatedButtonThemeData(
            style: ElevatedButton.styleFrom(
              elevation: 0,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
          inputDecorationTheme: InputDecorationTheme(
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            filled: true,
            fillColor: Colors.grey[50],
          ),
        ),
        home: BlocBuilder<AuthBloc, AuthState>(
          builder: (context, state) {
            if (state is AuthLoadingState) {
              return const Scaffold(
                body: Center(
                  child: CircularProgressIndicator(),
                ),
              );
            }
            
            if (state is AuthAuthenticatedState) {
              return const HomePage();
            }
            
            return const LoginPage();
          },
        ),
      ),
    );
  }
}
