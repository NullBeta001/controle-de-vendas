import { NgModule } from '@angular/core';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from "primeng/dropdown";
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ContextMenuModule } from 'primeng/contextmenu';
import { InputNumberModule } from 'primeng/inputnumber';

import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { PasswordModule } from 'primeng/password';
import { AutoCompleteModule } from 'primeng/autocomplete';

// import { CommonModule } from '@angular/common';
// import { InputSwitchModule } from 'primeng/inputswitch';
// import { InputTextareaModule } from 'primeng/inputtextarea';
// import { InputNumberModule } from 'primeng/inputnumber';

// import { CalendarModule } from 'primeng/calendar';

// import { SelectButtonModule } from 'primeng/selectbutton';
// import { TreeSelectModule } from 'primeng/treeselect';
// import { AccordionModule } from 'primeng/accordion';
// import { PaginatorModule } from 'primeng/paginator';
// import { BadgeModule } from 'primeng/badge';

// import { ChipsModule } from 'primeng/chips';
// import { ColorPickerModule } from 'primeng/colorpicker';
// import { EditorModule } from 'primeng/editor';
// import { KnobModule } from 'primeng/knob';
// import { KeyFilterModule } from 'primeng/keyfilter';
// import { ListboxModule } from 'primeng/listbox';
// import { PasswordModule } from 'primeng/password';
// import { RadioButtonModule } from 'primeng/radiobutton';
// import { RatingModule } from 'primeng/rating';
// import { SliderModule } from 'primeng/slider';
// import { SelectButtonModule } from 'primeng/selectbutton';
// import { ToggleButtonModule } from 'primeng/togglebutton';
// import { TreeSelectModule } from 'primeng/treeselect';
// import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
// import { SplitButtonModule } from 'primeng/splitbutton';
// import { SpeedDialModule } from 'primeng/speeddial';
// import { DataViewModule } from 'primeng/dataview';
// import { PaginatorModule } from 'primeng/paginator';
// import { TimelineModule } from 'primeng/timeline';
// import { DividerModule } from 'primeng/divider';
// import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [],
  imports: [
    InputTextModule,
    TableModule,
    MultiSelectModule,
    CheckboxModule,
    CardModule,
    TieredMenuModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    InputMaskModule,
    SidebarModule,
    CalendarModule,
    FileUploadModule,
    HttpClientModule,
    MessageModule,
    ProgressSpinnerModule,
    ContextMenuModule,
    InputNumberModule,
    ConfirmDialogModule,
    PasswordModule,
    AutoCompleteModule
  ],
  exports: [
    InputTextModule,
    TableModule,
    MultiSelectModule,
    CheckboxModule,
    CardModule,
    TieredMenuModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    InputMaskModule,
    SidebarModule,
    CalendarModule,
    FileUploadModule,
    HttpClientModule,
    MessageModule,
    ProgressSpinnerModule,
    ContextMenuModule,
    InputNumberModule,
    ConfirmDialogModule,
    PasswordModule,
    AutoCompleteModule
  ],
  providers: [ConfirmationService]
})
export class PrimengModule { }
