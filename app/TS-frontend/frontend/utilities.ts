import {
  userCredentialObject,
  eventResponse,
  userCredentialsArray
} from "../../@types/@type-module";
import {
  form,
  confirmDialog,
  validateKeyInput,
  repeatKeyInput,
  createKeyInput
} from "./listeners.js";
import {
  editConfirm
} from "./renderer.js";

export const isJsonString = (str: string) => {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

export const getDataDeleteValidationId = (target: HTMLButtonElement): string => {
  const value: string | null = target.getAttribute("data-delete-validation-id")
  if (!value) throw new Error("Couldn't get data action attribute");
  return value
}

export const getDataStoredObject = (target: HTMLButtonElement): userCredentialObject => {
  const dataObject: string | null = target.getAttribute("data-stored-object");
  if (!dataObject || !isJsonString(dataObject)) throw new Error("Error occurred when trying to get stored data")
  return JSON.parse(dataObject)
}

export const setDataAction = (action: string): void => {
  switch (action) {
      case "post":
          form.setAttribute("data-action", "post");
          break;
      case "update":
          form.setAttribute("data-action", "update");
          break;
      default:
  }
}

export const setNewDataDeleteId = (deleteButton: HTMLButtonElement, id: string): void => {
  // Used to validate that the right is stored when deletion is confirmed by user
  deleteButton.setAttribute("data-delete-id", id);
}

export const removeDataAction = (): void => {
  form.setAttribute("data-action", "");
}

export const getDataAction = (target: HTMLFormElement): string => {
  const value: string | null = target.getAttribute("data-action");
  if (!value) throw new Error("Couldn't get data action attribute");
  return value
}

export const getDataEvent = (target: HTMLButtonElement): string => {
  const value: string | null = target.getAttribute("data-event")
  if (!value) throw "Couldn't get data event attribute";
  return value
}

export const compileFormData = (form: HTMLFormElement): userCredentialObject => {
  const extractedData = new FormData(form) as unknown as Iterable < [userCredentialObject, FormDataEntryValue] > ;
  return Object.fromEntries(extractedData);
};

export const resetForm = (): void => {
  form.reset();
}

export const getAndValidateId = (): string => {
  const deleteButtons: NodeListOf < HTMLButtonElement > = document.querySelectorAll(".delete-item-button");
  let id;
  for (let i = 0; i < deleteButtons.length; i++) {
      const dataIdOne: string | null = deleteButtons[i].getAttribute("data-delete-id");
      if (!dataIdOne) continue;
      const dataIdTwo: string | null = deleteButtons[i].getAttribute("data-delete-validation-id");
      if (dataIdOne !== dataIdTwo) continue;
      id = dataIdOne
      break;
  }
  if (!id) throw new Error("Couldn't locate an id for delete")
  return id
}

export const removeDataDeleteId = (): void => {
  const deleteButtons: NodeListOf < HTMLButtonElement > = document.querySelectorAll(".delete-item-button")
  for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].setAttribute("data-delete-id", "#");
  }
}

export const updateFormValues = (data: userCredentialObject): void => {
  const formCollection: HTMLFormControlsCollection = form.elements;
  for (const property in data) {
      for (let i = 0; i < formCollection.length; i++) {
          if (formCollection[i].nodeName === "INPUT" || formCollection[i].nodeName === "TEXTAREA") {
              if ((formCollection[i] as HTMLInputElement | HTMLTextAreaElement).name === property) {
                  (formCollection[i] as HTMLInputElement | HTMLTextAreaElement).value = data[property as keyof typeof data]
              }
          }
      }
  }
}

export const getFormValues = (): userCredentialObject => {
  const formCollection: HTMLFormControlsCollection = form.elements;
  const obj: userCredentialObject = {
      id: "#",
      websiteInput: "",
      emailInput: "",
      usernameInput: "",
      passwordInput: "",
      additionalDataInput: ""
  };
  for (let i = 0; i < formCollection.length; i++) {
      if (formCollection[i].nodeName === "INPUT" || formCollection[i].nodeName === "TEXTAREA") {
          Object.assign(obj, {
    [(formCollection[i] as HTMLInputElement | HTMLTextAreaElement).name]: (formCollection[i] as HTMLInputElement | HTMLTextAreaElement).value
          });
      }
  }
  return obj
}

export const getAndValidateKeys = (): string => {
  const keyOne: string = createKeyInput.value;
  const keyTwo: string = repeatKeyInput.value;
  if (keyOne !== keyTwo) {
      throw new Error("Keys didn't match");
  }
  return keyOne
}

export const getKey = (): string => {
  return validateKeyInput.value;
}

export const confirm = (text: string, eventName: string) => {
  editConfirm(text, eventName)
  confirmDialog.showModal()
}

export const postConfirm = (): void => {
  confirm("Do you want to add a new item?", "postDatabaseData");
}

export const updateConfirm = (): void => {
  confirm("Do you want to edit this item?", "UpdateDatabaseData");
}

export const deleteConfirm = (): void => {
  confirm("Do you want to delete this item?", "deleteDatabaseData");
}

export const resetConfirm = (): void => {
  editConfirm("", "#")
  removeDataDeleteId()
  confirmDialog.close()
}

export const createResponse = (): eventResponse => {
  return {
      success: true,
  }
}

export const sortArrayAfterLetter = (data: userCredentialsArray, ): userCredentialsArray => {
  return data.sort((a, b) => (a.websiteInput.toLocaleLowerCase() > b.websiteInput.toLocaleLowerCase()) ? 1 : 
  ((b.websiteInput.toLocaleLowerCase() > a.websiteInput.toLocaleLowerCase()) ? -1 : 0))
}