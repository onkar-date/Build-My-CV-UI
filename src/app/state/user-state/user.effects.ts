import { IUser } from './../../shared/interface/user.interface';
import { IProfile } from 'src/app/shared/interface/profile.interface';
import { ProfileService } from './../../shared/services/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ToasterService } from './../../shared/services/toaster.service';
import { LoginService } from './../../shared/services/login.service';
import {
  addCertificate,
  addCertificateSuccess,
  addEducation,
  addEducationSuccess,
  addExperience,
  addExperienceSuccess,
  addInterest,
  addInterestSuccess,
  addProject,
  addProjectSuccess,
  addSkill,
  addSkillSuccess,
  deleteCertificate,
  deleteCertificateSuccess,
  deleteEducation,
  deleteEducationSuccess,
  deleteExperience,
  deleteExperienceSuccess,
  deleteInterest,
  deleteInterestSuccess,
  deleteProject,
  deleteProjectSuccess,
  deleteSkill,
  deleteSkillSuccess,
  loginUser,
  loginUserFailed,
  loginUserSuccess,
  logoutUser,
  registerUser,
  registerUserFailed,
  registerUserSuccess,
  updateCertificate,
  updateCertificateSuccess,
  updateContactDetails,
  updateContactDetailsSuccess,
  updateEducation,
  updateEducationSuccess,
  updateExperience,
  updateExperienceSuccess,
  updateInterest,
  updateInterestSuccess,
  updatePersonalDetails,
  updatePersonalDetailsSuccess,
  updateProject,
  updateProjectSuccess,
  updateSkill,
  updateSkillSuccess,
} from './user.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { ClientStoreService } from 'src/app/shared/services/client-store.service';
import { AppState } from '../app.state';
import { clearCVData } from '../CV-State/cv.actions';

@Injectable()
export class UserEffect {
  constructor(
    private action$: Actions,
    private loginService: LoginService,
    private profileService: ProfileService,
    private toast: ToasterService,
    private router: Router,
    private clientStore: ClientStoreService,
    private store: Store<AppState>,
    private spinner: NgxSpinnerService
  ) {}

  loginUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(loginUser),
      switchMap((action) => {
        this.spinner.show();
        return from(this.loginService.login(action.loginData)).pipe(
          map((userData) => {
            this.clientStore.setItem('user', userData);
            this.toast.success('Logged in Succesfully!');
            this.router.navigate(['templates']);
            this.spinner.hide();
            return loginUserSuccess({ userData });
          }),
          catchError((err) => {
            this.spinner.hide();
            this.toast.error(err.error?.message || 'Something went wrong');
            return of(loginUserFailed());
          })
        );
      })
    )
  );

  logoutUser$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(logoutUser),
        map(() => {
          this.clientStore.removeItem('cvState');
          this.clientStore.removeItem('user');
          this.store.dispatch(clearCVData());
          this.toast.success('Logged out Succesfully!!');
          this.router.navigate(['login']);
        })
      );
    },
    { dispatch: false }
  );

  registerUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(registerUser),
      switchMap((action) =>
        from(this.loginService.register(action.userData)).pipe(
          map((userData) => {
            this.clientStore.setItem('user', userData);
            this.toast.success('User registered succesfully!');
            this.router.navigate(['templates']);
            return registerUserSuccess({ userData });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of(registerUserFailed());
          })
        )
      )
    )
  );

  savePersonalDetails$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updatePersonalDetails),
      switchMap((action) =>
        from(
          this.profileService.savePersonalDetails(
            action.userId,
            action.personalDetails
          )
        ).pipe(
          map((profileData: IProfile) => {
            updateProfileDataInClientStore(this.clientStore, profileData);
            this.toast.success('Personal Details Saved Succesfully!');
            return updatePersonalDetailsSuccess({
              profileData,
            });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of();
          })
        )
      )
    );
  });

  saveContactDetails$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updateContactDetails),
      switchMap((action) =>
        from(
          this.profileService.saveContactDetails(
            action.userId,
            action.contactDetails
          )
        ).pipe(
          map((profileData: IProfile) => {
            updateProfileDataInClientStore(this.clientStore, profileData);
            this.toast.success('Contact Details Saved Succesfully!');
            return updateContactDetailsSuccess({
              profileData,
            });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of();
          })
        )
      )
    );
  });

  // Experience
  addExperience$ = createEffect(() => {
    return this.action$.pipe(
      ofType(addExperience),
      switchMap((action) =>
        from(
          this.profileService.addExperience(action.userId, action.experience)
        ).pipe(
          map((profileData: IProfile) => {
            updateProfileDataInClientStore(this.clientStore, profileData);
            this.toast.success('Experience Added Succesfully!');
            return addExperienceSuccess({
              profileData,
            });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of();
          })
        )
      )
    );
  });

  updateExperience$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updateExperience),
      switchMap((action) =>
        from(
          this.profileService.updateExperience(action.userId, action.experience)
        ).pipe(
          map((profileData: IProfile) => {
            this.toast.success('Experience Updated Succesfully!');
            return updateExperienceSuccess({
              profileData,
            });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of();
          })
        )
      )
    );
  });

  deleteExperience$ = createEffect(() => {
    return this.action$.pipe(
      ofType(deleteExperience),
      switchMap((action) =>
        from(
          this.profileService.deleteExperience(action.userId, action.expId)
        ).pipe(
          map((profileData: IProfile) => {
            updateProfileDataInClientStore(this.clientStore, profileData);
            this.toast.success('Experience Deleted Succesfully!');
            return deleteExperienceSuccess({
              profileData,
            });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of();
          })
        )
      )
    );
  });

  // Education
  addEducation$ = createEffect(() => {
    return this.action$.pipe(
      ofType(addEducation),
      switchMap((action) =>
        from(
          this.profileService.addEducation(action.userId, action.education)
        ).pipe(
          map((profileData: IProfile) => {
            updateProfileDataInClientStore(this.clientStore, profileData);
            this.toast.success('Education Added Succesfully!');
            return addEducationSuccess({
              profileData,
            });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of();
          })
        )
      )
    );
  });

  updateEducation$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updateEducation),
      switchMap((action) =>
        from(
          this.profileService.updateEducation(action.userId, action.education)
        ).pipe(
          map((profileData: IProfile) => {
            this.toast.success('Education Updated Succesfully!');
            return updateEducationSuccess({
              profileData,
            });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of();
          })
        )
      )
    );
  });

  deleteEducation$ = createEffect(() => {
    return this.action$.pipe(
      ofType(deleteEducation),
      switchMap((action) =>
        from(
          this.profileService.deleteEducation(action.userId, action.educationId)
        ).pipe(
          map((profileData: IProfile) => {
            updateProfileDataInClientStore(this.clientStore, profileData);
            this.toast.success('Education Deleted Succesfully!');
            return deleteEducationSuccess({
              profileData,
            });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of();
          })
        )
      )
    );
  });

  // Skill
  addSkill$ = createEffect(() => {
    return this.action$.pipe(
      ofType(addSkill),
      switchMap((action) =>
        from(
          this.profileService.addSkill(action.userId, action.skill)
        ).pipe(
          map((profileData: IProfile) => {
            updateProfileDataInClientStore(this.clientStore, profileData);
            this.toast.success('Skill Added Succesfully!');
            return addSkillSuccess({
              profileData,
            });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of();
          })
        )
      )
    );
  });

  updateSkill$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updateSkill),
      switchMap((action) =>
        from(
          this.profileService.updateSkill(action.userId, action.skill)
        ).pipe(
          map((profileData: IProfile) => {
            this.toast.success('Skill Updated Succesfully!');
            return updateSkillSuccess({
              profileData,
            });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of();
          })
        )
      )
    );
  });

  deleteSkill$ = createEffect(() => {
    return this.action$.pipe(
      ofType(deleteSkill),
      switchMap((action) =>
        from(
          this.profileService.deleteSkill(action.userId, action.skillId)
        ).pipe(
          map((profileData: IProfile) => {
            updateProfileDataInClientStore(this.clientStore, profileData);
            this.toast.success('Skill Deleted Succesfully!');
            return deleteSkillSuccess({
              profileData,
            });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of();
          })
        )
      )
    );
  });

  // Project
  addProject$ = createEffect(() => {
    return this.action$.pipe(
      ofType(addProject),
      switchMap((action) =>
        from(
          this.profileService.addProject(action.userId, action.project)
        ).pipe(
          map((profileData: IProfile) => {
            updateProfileDataInClientStore(this.clientStore, profileData);
            this.toast.success('Project Added Succesfully!');
            return addProjectSuccess({
              profileData,
            });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of();
          })
        )
      )
    );
  });

  updateProject$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updateProject),
      switchMap((action) =>
        from(
          this.profileService.updateProject(action.userId, action.project)
        ).pipe(
          map((profileData: IProfile) => {
            this.toast.success('Project Updated Succesfully!');
            return updateProjectSuccess({
              profileData,
            });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of();
          })
        )
      )
    );
  });

  deleteProject$ = createEffect(() => {
    return this.action$.pipe(
      ofType(deleteProject),
      switchMap((action) =>
        from(
          this.profileService.deleteProject(action.userId, action.projectId)
        ).pipe(
          map((profileData: IProfile) => {
            updateProfileDataInClientStore(this.clientStore, profileData);
            this.toast.success('Project Deleted Succesfully!');
            return deleteProjectSuccess({
              profileData,
            });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of();
          })
        )
      )
    );
  });

  // Certificate
  addCertificate$ = createEffect(() => {
    return this.action$.pipe(
      ofType(addCertificate),
      switchMap((action) =>
        from(
          this.profileService.addCertificate(action.userId, action.certificate)
        ).pipe(
          map((profileData: IProfile) => {
            updateProfileDataInClientStore(this.clientStore, profileData);
            this.toast.success('Certificate Added Succesfully!');
            return addCertificateSuccess({
              profileData,
            });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of();
          })
        )
      )
    );
  });

  updateCertificate$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updateCertificate),
      switchMap((action) =>
        from(
          this.profileService.updateCertificate(action.userId, action.certificate)
        ).pipe(
          map((profileData: IProfile) => {
            this.toast.success('Certificate Updated Succesfully!');
            return updateCertificateSuccess({
              profileData,
            });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of();
          })
        )
      )
    );
  });

  deleteCertificate$ = createEffect(() => {
    return this.action$.pipe(
      ofType(deleteCertificate),
      switchMap((action) =>
        from(
          this.profileService.deleteCertificate(action.userId, action.certificateId)
        ).pipe(
          map((profileData: IProfile) => {
            updateProfileDataInClientStore(this.clientStore, profileData);
            this.toast.success('Certificate Deleted Succesfully!');
            return deleteCertificateSuccess({
              profileData,
            });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of();
          })
        )
      )
    );
  });

  // Interest
  addInterest$ = createEffect(() => {
    return this.action$.pipe(
      ofType(addInterest),
      switchMap((action) =>
        from(
          this.profileService.addInterest(action.userId, action.interest)
        ).pipe(
          map((profileData: IProfile) => {
            updateProfileDataInClientStore(this.clientStore, profileData);
            this.toast.success('Interest Added Succesfully!');
            return addInterestSuccess({
              profileData,
            });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of();
          })
        )
      )
    );
  });

  updateInterest$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updateInterest),
      switchMap((action) =>
        from(
          this.profileService.updateInterest(action.userId, action.interest)
        ).pipe(
          map((profileData: IProfile) => {
            this.toast.success('Interest Updated Succesfully!');
            return updateInterestSuccess({
              profileData,
            });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of();
          })
        )
      )
    );
  });

  deleteInterest$ = createEffect(() => {
    return this.action$.pipe(
      ofType(deleteInterest),
      switchMap((action) =>
        from(
          this.profileService.deleteInterest(action.userId, action.interestId)
        ).pipe(
          map((profileData: IProfile) => {
            updateProfileDataInClientStore(this.clientStore, profileData);
            this.toast.success('Interest Deleted Succesfully!');
            return deleteInterestSuccess({
              profileData,
            });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of();
          })
        )
      )
    );
  });
}

async function updateProfileDataInClientStore(
  clientStore: ClientStoreService,
  profileData: IProfile
): Promise<void> {
  const userData: IUser = await clientStore.getItem('user');
  userData.profileData = profileData;
  clientStore.setItem('user', userData);
}
