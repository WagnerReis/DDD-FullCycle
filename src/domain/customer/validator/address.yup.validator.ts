import ValidatorInterface from "../../@shared/validator/validator.interface";
import * as ypu from "yup";
import Address from "../value-object/address";

export default class AddressYupValidator
  implements ValidatorInterface<Address>
{
  validate(entity: Address): void {
    try {
      ypu.object().shape({
        street: ypu.string().required("Street is required"),
        number: ypu.number().required("Number is required"),
        zip: ypu.string().required("Zip is required"),
        city: ypu.string().required("City is required"),
      })
      .validateSync({
        street: entity.street,
        number: entity.number,
        zip: entity.zip,
        city: entity.city,
      }, {
        abortEarly: false
      })
    } catch (errors) {
      const e = errors as ypu.ValidationError;
      e.errors.forEach(error => {
        entity.notification.addError({
          context: "address",
          message: error,
        })
      })
    }
  }
}
