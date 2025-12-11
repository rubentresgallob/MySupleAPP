import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../bloc/home_bloc.dart';
import '../bloc/home_event.dart';
import '../bloc/home_state.dart';
import '../widgets/supplement_card.dart';
import '../widgets/streak_badge.dart';
import '../../auth/bloc/auth_bloc.dart';
import '../../auth/bloc/auth_event.dart';

/// Página principal (Home)
class HomePage extends StatefulWidget {
  const HomePage({super.key});
  
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  void initState() {
    super.initState();
    // Cargar suplementos al iniciar
    context.read<HomeBloc>().add(HomeLoadSupplementsEvent());
  }
  
  Future<void> _onRefresh() async {
    context.read<HomeBloc>().add(HomeRefreshEvent());
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mis Suplementos'),
        actions: [
          // Botón de perfil/logout
          PopupMenuButton(
            icon: const Icon(Icons.account_circle),
            itemBuilder: (context) => [
              PopupMenuItem(
                child: const Row(
                  children: [
                    Icon(Icons.logout, size: 20),
                    SizedBox(width: 8),
                    Text('Cerrar sesión'),
                  ],
                ),
                onTap: () {
                  context.read<AuthBloc>().add(AuthLogoutEvent());
                },
              ),
            ],
          ),
        ],
      ),
      body: BlocConsumer<HomeBloc, HomeState>(
        listener: (context, state) {
          if (state is HomeErrorState) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text(state.message),
                backgroundColor: Colors.red,
              ),
            );
          }
        },
        builder: (context, state) {
          if (state is HomeLoadingState) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }
          
          if (state is HomeEmptyState) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.medication_outlined,
                    size: 80,
                    color: Colors.grey[400],
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'No tienes suplementos aún',
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      color: Colors.grey[600],
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Toca el botón + para agregar tu primer suplemento',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Colors.grey[500],
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            );
          }
          
          if (state is HomeLoadedState) {
            return RefreshIndicator(
              onRefresh: _onRefresh,
              child: CustomScrollView(
                slivers: [
                  // Badge de racha en la parte superior
                  SliverToBoxAdapter(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: StreakBadge(streak: state.userStreak),
                    ),
                  ),
                  
                  // Lista de suplementos
                  SliverPadding(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0),
                    sliver: SliverList(
                      delegate: SliverChildBuilderDelegate(
                        (context, index) {
                          final supplement = state.supplements[index];
                          final taken = state.progress[supplement.id] ?? 0;
                          
                          return SupplementCard(
                            supplement: supplement,
                            taken: taken,
                            onMarkTaken: () {
                              context.read<HomeBloc>().add(
                                HomeMarkIntakeTakenEvent(supplement.id),
                              );
                            },
                          );
                        },
                        childCount: state.supplements.length,
                      ),
                    ),
                  ),
                  
                  // Espaciado al final
                  const SliverToBoxAdapter(
                    child: SizedBox(height: 80),
                  ),
                ],
              ),
            );
          }
          
          return const SizedBox.shrink();
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // TODO: Navegar a la página de agregar suplemento
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Funcionalidad de agregar suplemento por implementar'),
            ),
          );
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
