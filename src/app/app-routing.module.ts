import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'especifico/:id', loadChildren: './especifico/especifico.module#EspecificoPageModule' },
  { path: 'configurador', loadChildren: './configurador/configurador.module#ConfiguradorPageModule' },
  { path: 'informacion', loadChildren: './informacion/informacion.module#InformacionPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  