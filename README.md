# TrackPOI - Frontend Challenge  
![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-ar21.svg)  

---

## 📑 Índice
1. [Introdução](#introdução)  
2. [Arquitetura do Sistema](#arquitetura-do-sistema)  
3. [Estrutura do Projeto](#estrutura-do-projeto)  
4. [Funcionalidades](#funcionalidades)
5. [Screenshot do Projeto](#Screenshot-do-Projeto)
6. [Conclusão](#conclusão)  
7. [Autor](#autor)  

---

## 🚀 Introdução
O projeto **TrackPOI - Frontend** é uma aplicação desenvolvida em **Angular 16** que consome a API do backend **TrackPOI**.  
O objetivo é permitir a **visualização do tempo que veículos permanecem em POIs (Points of Interest)**, com:  
- Filtros por placa e data  
- Exibição em **mapa**  
- Resultados organizados em **tabela interativa**  

---

## 🏗️ Arquitetura do Sistema
- **Dashboard Component** → filtros, status e interação com o backend.  
- **Dwell Table Component** → exibição dos resultados em tabela.  
- **Map View Component** → exibição dos POIs e posições no Google Maps (em nova janela).  
- **Services** → comunicação com o backend (`PositionService`, `PoiService`, `DwellService`).  
- **Pipes** → transformação de dados (ex: `SafeUrlPipe` para URLs de mapa).  

➡️ A arquitetura segue **modularidade**, garantindo que cada componente tenha responsabilidade clara, facilitando **manutenção** e **testes**.  

---

## 📂 Estrutura do Projeto

```text
trackpoi-frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/         # Modelos de dados (POI, Position, DwellEntry)
│   │   │   └── services/       # Serviços que consomem API
│   │   ├── pages/
│   │   │   └── dashboard/      # Componente principal da dashboard
│   │   ├── shared/
│   │   │   ├── components/     # Filtros, Map View, Dwell Table
│   │   │   └── pipes/          # Pipes como SafeUrlPipe
│   │   ├── app.component.*     # Root component
│   │   ├── app.module.ts       # Módulo principal
│   │   └── app-routing.module.ts
│   └── assets/
│       └── img-main.png        # Screenshot do projeto
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```
## ⚡ Funcionalidades

- ✅ **Filtros por placa e data** → permite selecionar qualquer placa e data desde 1990.  
- ✅ **Carregamento inicial automático** → dados exibidos logo ao abrir a página.  
- ✅ **Limpar filtros** → mantém os dados originais, apenas remove os filtros aplicados.  
- ✅ **Tabela de resultados** → mostra tempo em POIs, com link para abrir mapa em nova janela.  
- ✅ **Mapa interativo** → botão *“See POI on Map”* abre Google Maps na posição específica.  
- ✅ **Exportar CSV** → botão para baixar os dados filtrados.  
- ✅ **UI Profissional** → inputs, botões e tabela estilizados com margens, centralização e cores modernas.  

---

## 🖼️ Screenshot do Projeto

![TrackPOI Frontend Screenshot](https://raw.githubusercontent.com/sansaovieira/trackPoi-challenge-mobi7-frontend/main/src/assets/img-main.png)
---

## ✅ Conclusão
O **frontend TrackPOI** oferece uma interface **intuitiva e responsiva** para visualizar os dados de veículos e POIs.  

- Segue boas práticas de **Angular**, modularização e separação de responsabilidades.  
- Estrutura preparada para **manutenção** e **extensão futura**.

---

## 👨‍💻 Autor

- **Nome:** Sansão Dembué Vieira  
- **Email:** [vieirasansao42@gmail.com](mailto:vieirasansao42@gmail.com)  
- **GitHub:** [https://github.com/sansaovieira](https://github.com/sansaovieira)  
- **LinkedIn:** [https://linkedin.com/sansaovieira](https://linkedin.com/sansaovieira)  
- **Descrição:** Desenvolvedor **Fullstack Angular + Java**


