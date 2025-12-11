import 'package:equatable/equatable.dart';

/// Eventos del HomeBloc
abstract class HomeEvent extends Equatable {
  const HomeEvent();
  
  @override
  List<Object> get props => [];
}

/// Evento para cargar los suplementos
class HomeLoadSupplementsEvent extends HomeEvent {}

/// Evento para refrescar los datos
class HomeRefreshEvent extends HomeEvent {}

/// Evento para marcar una toma como realizada
class HomeMarkIntakeTakenEvent extends HomeEvent {
  final String supplementId;
  
  const HomeMarkIntakeTakenEvent(this.supplementId);
  
  @override
  List<Object> get props => [supplementId];
}
