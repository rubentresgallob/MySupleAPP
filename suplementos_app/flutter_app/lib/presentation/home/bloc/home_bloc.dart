import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../data/datasources/supplements_remote_datasource.dart';
import '../../../data/datasources/intakes_remote_datasource.dart';
import 'home_event.dart';
import 'home_state.dart';

/// BLoC para manejar el home
class HomeBloc extends Bloc<HomeEvent, HomeState> {
  final SupplementsRemoteDataSource _supplementsDataSource;
  final IntakesRemoteDataSource _intakesDataSource;
  
  HomeBloc(this._supplementsDataSource, this._intakesDataSource)
      : super(HomeInitialState()) {
    on<HomeLoadSupplementsEvent>(_onLoadSupplements);
    on<HomeRefreshEvent>(_onRefresh);
    on<HomeMarkIntakeTakenEvent>(_onMarkIntakeTaken);
  }
  
  /// Carga los suplementos del usuario
  Future<void> _onLoadSupplements(
    HomeLoadSupplementsEvent event,
    Emitter<HomeState> emit,
  ) async {
    try {
      emit(HomeLoadingState());
      
      // Cargar suplementos
      final supplements = await _supplementsDataSource.getUserSupplements();
      
      if (supplements.isEmpty) {
        emit(HomeEmptyState());
        return;
      }
      
      // Cargar progreso del día
      final progressData = await _intakesDataSource.getProgressToday();
      final progress = <String, int>{};
      
      for (final supplement in supplements) {
        final supplementProgress = progressData[supplement.id];
        if (supplementProgress != null) {
          progress[supplement.id] = supplementProgress['taken'] as int;
        } else {
          progress[supplement.id] = 0;
        }
      }
      
      // Cargar racha del usuario
      final userStreak = await _intakesDataSource.getUserStreak();
      
      emit(HomeLoadedState(
        supplements: supplements,
        progress: progress,
        userStreak: userStreak,
      ));
    } catch (e) {
      emit(HomeErrorState(e.toString()));
    }
  }
  
  /// Refresca los datos
  Future<void> _onRefresh(
    HomeRefreshEvent event,
    Emitter<HomeState> emit,
  ) async {
    add(HomeLoadSupplementsEvent());
  }
  
  /// Marca una toma como realizada
  Future<void> _onMarkIntakeTaken(
    HomeMarkIntakeTakenEvent event,
    Emitter<HomeState> emit,
  ) async {
    try {
      // Registrar la toma
      await _intakesDataSource.createIntake(
        userSupplementId: event.supplementId,
      );
      
      // Recargar los datos
      add(HomeLoadSupplementsEvent());
    } catch (e) {
      emit(HomeErrorState(e.toString()));
    }
  }
}
