import * as React from 'react';
import { Button, Form } from 'react-bootstrap';
import FormInput from '../Auth/FormInput';
import { createTodoAPI } from '@/public/utils/todoAPI';


export default function CreateTodoModal () {

  async function handleSubmit(event: React.FormEvent) {

    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);

    console.log("fd result : ", fd.get("title") as string, fd.get("content") as string);

    const responseStatus = await createTodoAPI({
      title: fd.get("title") as string,
      content: fd.get("content") as string,
    });

    console.log(responseStatus);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormInput id={0} name='title' type='text' placeholder={'title'} errorMessage={''} label={''} pattern={''} required={false} />
      <FormInput id={0} name='content' type='text' placeholder={'content'} errorMessage={''} label={''} pattern={''} required={false} />
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  );
}
