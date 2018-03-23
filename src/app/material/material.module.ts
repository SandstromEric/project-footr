import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
    imports: [],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatMenuModule,
        MatTabsModule,
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule
    ],
    declarations: []
})
export class MaterialModule { }
