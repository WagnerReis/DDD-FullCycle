import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import * as ypu from "yup";

export default class CustomerYupValidator
  implements ValidatorInterface<Customer>
{
  validate(entity: Customer): void {
    try {
      ypu.object().shape({
        id: ypu.string().required("Id is required"),
        name: ypu.string().required("Id is required"),
      })
      .validateSync({
        id: entity.id,
        name: entity.name,
      }, {
        abortEarly: false
      })
    } catch (errors) {
      const e = errors as ypu.ValidationError;
      e.errors.forEach(error => {
        entity.notification.addError({
          context: "customer",
          message: error,
        })
      })
    }
  }
}
