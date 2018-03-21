import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
@NgModule({
    imports: [],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatMenuModule,
        MatTabsModule,
        MatIconModule,
        MatCardModule
    ],
    declarations: []
})
export class MaterialModule { }
