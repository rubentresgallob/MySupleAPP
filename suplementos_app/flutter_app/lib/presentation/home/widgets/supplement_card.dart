import 'package:flutter/material.dart';
import '../../../domain/entities/user_supplement.dart';

/// Tarjeta que muestra un suplemento con su progreso
class SupplementCard extends StatelessWidget {
  final UserSupplement supplement;
  final int taken;
  final VoidCallback onMarkTaken;
  
  const SupplementCard({
    super.key,
    required this.supplement,
    required this.taken,
    required this.onMarkTaken,
  });
  
  @override
  Widget build(BuildContext context) {
    final progress = taken / supplement.timesPerDay;
    final isComplete = taken >= supplement.timesPerDay;
    
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      elevation: 2,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Encabezado con nombre y forma
            Row(
              children: [
                // Ícono del suplemento
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: isComplete
                        ? Colors.green.shade100
                        : Colors.blue.shade100,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    _getSupplementIcon(supplement.form),
                    color: isComplete ? Colors.green : Colors.blue,
                  ),
                ),
                const SizedBox(width: 12),
                
                // Nombre y forma
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        supplement.name,
                        style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        '${supplement.dosageAmount} ${supplement.dosageUnit} - ${supplement.form}',
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: Colors.grey[600],
                        ),
                      ),
                    ],
                  ),
                ),
                
                // Check si está completo
                if (isComplete)
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.green,
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(
                      Icons.check,
                      color: Colors.white,
                      size: 20,
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 12),
            
            // Progreso
            Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Progreso de hoy',
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: Colors.grey[600],
                        ),
                      ),
                      const SizedBox(height: 4),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(10),
                        child: LinearProgressIndicator(
                          value: progress.clamp(0.0, 1.0),
                          minHeight: 8,
                          backgroundColor: Colors.grey[200],
                          valueColor: AlwaysStoppedAnimation<Color>(
                            isComplete ? Colors.green : Colors.blue,
                          ),
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        '$taken / ${supplement.timesPerDay} tomas',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 12),
                
                // Botón de marcar como tomado
                if (!isComplete)
                  ElevatedButton(
                    onPressed: onMarkTaken,
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                    ),
                    child: const Text('Tomar'),
                  ),
              ],
            ),
            
            // Horarios programados
            if (supplement.schedules.isNotEmpty) ..[
              const SizedBox(height: 12),
              Wrap(
                spacing: 8,
                children: supplement.schedules.map((schedule) {
                  return Chip(
                    label: Text(
                      schedule,
                      style: const TextStyle(fontSize: 12),
                    ),
                    padding: EdgeInsets.zero,
                    visualDensity: VisualDensity.compact,
                  );
                }).toList(),
              ),
            ],
          ],
        ),
      ),
    );
  }
  
  /// Retorna el ícono apropiado según la forma del suplemento
  IconData _getSupplementIcon(String form) {
    switch (form.toLowerCase()) {
      case 'pastilla':
      case 'tableta':
        return Icons.medication;
      case 'cápsula':
        return Icons.vaccines;
      case 'polvo':
        return Icons.science;
      case 'líquido':
        return Icons.water_drop;
      case 'gominola':
        return Icons.favorite;
      default:
        return Icons.medical_services;
    }
  }
}
