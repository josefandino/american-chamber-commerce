import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContactFormI } from '@pages/contact/constact.interface';
import { ContactService } from '@pages/contact/contact.service';
import { EstaSeguroComponent } from '@shared/components/esta-seguro/esta-seguro.component';
import { InputEmailComponent } from '@shared/components/input-email/input-email.component';
import { InputPhoneComponent } from '@shared/components/input-phone/input-phone.component';
import { InputTextComponent } from '@shared/components/input-text/input-text.component';
import { InputTextareaComponent } from '@shared/components/input-textarea/input-textarea.component';
import { RespDialogI } from '@shared/models/global.interface';
import { AngularModule, MaterialModule } from '@shared/modules';
import { GlobalService } from '@shared/services/global.service';
import { LanguageService } from '@shared/services/language.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form-memberships',
  imports: [
    AngularModule,
    MaterialModule,
    InputTextComponent,
    InputEmailComponent,
    InputPhoneComponent,
    InputTextareaComponent,
  ],
  templateUrl: './form-memberships.component.html',
  styleUrl: './form-memberships.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormMembershipsComponent {
  public labelsNames = signal<any>({});

  contactForm!: FormGroup;

  protected readonly unsubscribeAll: Subject<any> = new Subject<any>();

  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _toastr = inject(ToastrService);
  private readonly _languageSvc = inject(LanguageService);
  private readonly _contactSvc = inject(ContactService);
  private readonly _globalSvc = inject(GlobalService);
  private readonly _dialog = inject(MatDialog);

  ngOnInit(): void {
    this.listenerLanguage();
    this.initLoginForm();
  }
  private listenerLanguage(): void {
    this._languageSvc.language$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((langue: string) => {
        if (langue === 'es') {
          this.labelsNames.set({
            title: 'Información personal',
            first_name: 'Nombre',
            last_name: 'Apellido',
            phone: 'Teléfono',
            subject: 'Asunto',
            message: 'Mensaje',
            send: 'Enviar',
            category: 'Categoría',
            name_company: 'Nombre de la empresa',
            address: 'Dirección',
            city: 'Ciudad',
            state: 'Estado',
            zip_code: 'Código postal',
            country: 'País',
            sector: 'Sector',
            website: 'Website',
            description: 'Descripción',
          });
        } else {
          this.labelsNames.set({
            title: 'Personal information',
            first_name: 'First Name',
            last_name: 'Last Name',
            phone: 'Phone',
            subject: 'Subject',
            message: 'Message',
            send: 'Send',
            category: 'Category',
            name_company: 'Name of the company',
            address: 'Address',
            city: 'City',
            state: 'State',
            zip_code: 'Zip code',
            country: 'Country',
            sector: 'Sector',
            website: 'Website',
            description: 'Description',
          });
        }
      });
  }

  private initLoginForm(): void {
    this.contactForm = this._fb.group({
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),

      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),

      category: new FormControl('silver', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),

      name_company: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      state: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      zip_code: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      sector: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      website: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
    });
  }

  public getControl(fieldName: string): FormControl {
    return this.contactForm.get(fieldName) as FormControl;
  }

  private checkTerms(): void {
    this.contactForm
      .get('policies')
      ?.valueChanges.subscribe((checked: boolean) => {
        if (!checked) {
          this.contactForm.get('policies')?.setErrors({ required: true });
        } else {
          this.contactForm.get('policies')?.setErrors(null);
        }
      });
  }

  public validarForm(): void {
    if (this.contactForm.invalid) {
      this.camposRequeridos();
      return;
    }
    this.estaSeguro();
  }

  private estaSeguro() {
    const action = 'create';
    const message = '¿La información que se esta enviando es correcta?';
    const data = this.contactForm.getRawValue();
    const dialogRef = this._dialog.open(EstaSeguroComponent, {
      width: '600px',
      disableClose: true,
      data: { data, action, message },
    });
    dialogRef.afterClosed().subscribe((dataResp: RespDialogI) => {
      if (!dataResp) return;
      if (dataResp.action === 'create') {
        this.payloadBody(data);
      }
    });
  }

  private payloadBody(resp: ContactFormI): void {
    const trimmedPayload = this._globalSvc.trimStringProperties(resp);
    this.sendMessage(trimmedPayload);
  }

  private sendMessage(body: ContactFormI): void {
    this._toastr.success(
      'Se ha registrado correctamente en la membresía',
      'Éxito',
    );
    this.contactForm.reset();
    setTimeout(() => {
      this._router.navigate(['/home']);
    }, 3000);
    // this._contactSvc
    //   .createContact(body)
    //   .pipe(takeUntil(this.unsubscribeAll))
    //   .subscribe({
    //     next: (resp: any) => {
    //       if (resp.status === 201) {
    //         this._toastr.success(resp.message, 'Éxito');
    //         this.contactForm.reset();
    //         setTimeout(() => {
    //           this._router.navigate(['/home']);
    //         }, 3000);
    //       } else {
    //         this._toastr.error(resp.message, 'Error');
    //       }
    //     },
    //     error: (error: HttpErrorResponse) => {
    //       this._toastr.error(error.error.message, 'Error');
    //       setTimeout(() => {
    //         this._router.navigate(['/home']);
    //       }, 3000);
    //     },
    //   });
  }

  formLoginInvalid(): boolean {
    this.contactForm.markAllAsTouched();
    return this.contactForm.invalid;
  }

  public camposRequeridos(): void {
    this._toastr.warning('Campos requeridos', 'Formulario invalido');
    this.contactForm.markAllAsTouched();
  }

  clearField(item: string): void {
    while (this.contactForm.get(item)?.value) {
      this.contactForm.get(item)?.setValue('');
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }
}
