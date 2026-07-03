import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VeiculoService } from '../../services/veiculo.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [VeiculoService],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private router = inject(Router);
  
  veiculos: any[] = [];
  registrosFabrica: any[] = [];
  veiculoSelecionado: any = null;
  codigoBusca: string = '';

  constructor(
    private veiculoService: VeiculoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarDadosDoDashboard();
  }

  toggleSidebar() {
    const sidebar = document.getElementById('sidebarMenu');
    if (sidebar) {
      sidebar.classList.toggle('fechada');
    }
  }

  irParaHome() {
    this.router.navigate(['/home']);
  }

  irParaDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.removeItem('usuarioLogado');
    sessionStorage.removeItem('usuarioLogado');
    this.router.navigate(['/login']);
  }

  carregarDadosDoDashboard(): void {
    this.veiculoService.getVehicles().subscribe({
      next: (dadosVeiculos) => {
        if (dadosVeiculos && dadosVeiculos.vehicles) {
          this.veiculos = dadosVeiculos.vehicles;

          this.veiculoService.getVehicleData().subscribe({
            next: (dadosTelemetria: any) => {
              this.registrosFabrica = Array.isArray(dadosTelemetria) ? dadosTelemetria : [];

              if (this.veiculos.length > 0) {
                this.veiculoSelecionado = this.veiculos[0];
              }

              this.cdr.detectChanges();
            },
            error: (err) => console.error('Erro ao carregar telemetria:', err)
          });
        }
      },
      error: (err) => console.error('Erro ao carregar veículos:', err)
    });
  }

  get registrosFiltrados(): any[] {
    const termo = this.codigoBusca.trim().toLowerCase();

    if (termo) {
      return this.registrosFabrica.filter((reg: any) => 
        reg && reg.vin && String(reg.vin).toLowerCase().includes(termo)
      );
    }

    if (!this.veiculoSelecionado || this.veiculoSelecionado.id === undefined) {
      return [];
    }

    return this.registrosFabrica.filter((reg: any) => 
      reg && Number(reg.id) === Number(this.veiculoSelecionado.id)
    );
  }

  onVeiculoChange(): void {
    this.codigoBusca = '';
  }

  onCodigoInput(): void {
    const termo = this.codigoBusca.trim().toLowerCase();
    if (!termo) return;

    const registroCorrespondente = this.registrosFabrica.find((reg: any) => 
      reg && reg.vin && String(reg.vin).toLowerCase().includes(termo)
    );
    
    if (registroCorrespondente && registroCorrespondente.id !== undefined) {
      const veiculoDono = this.veiculos.find(v => Number(v.id) === Number(registroCorrespondente.id));
      if (veiculoDono) {
        this.veiculoSelecionado = veiculoDono;
      }
    }
  }

  getFotoVeiculo(nome: string): string {
    if (!nome) return 'ford.png';
    if (nome === 'Bronco Sport') {
      return 'broncoSport.png';
    }
    return `${nome.toLowerCase()}.png`;
  }
}