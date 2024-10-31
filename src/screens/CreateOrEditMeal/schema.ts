import * as yup from 'yup';

export const schema = yup.object({
    name: yup.string(),
    description: yup.string(),
    date: yup.date().required('Error'),
    diet: yup.boolean()
})

export type IMealForm = typeof schema.__outputType