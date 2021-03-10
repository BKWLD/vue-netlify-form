# vue-netlify-form

This component was created to simplify submission to [Netlify Forms](https://docs.netlify.com/forms) and help catch common mistakes.

## Features

- Validates presence of form and field names.  Form name is a required prop.  The presence of field names is validated during development (by checking `NODE_ENV != "production`) and emits a console warning like `Missing Netlify form field named: Email` if a form field lacks a name.
- Submits form data to Netlify using [@nuxt/axios](https://axios.nuxtjs.org/).
- Passes form lifecycle state through scroped slots.

## Usage

```vue
<template>

  <netlify-form name='Contact' :form='form'>
    <template #default='{readonly, submitting, submitted}'>
    
      <p v-if='submitted'>Thanks for your submission</p>
      
      <input 
        name='Email' 
        placeholder='Email' 
        v-model='form.Email' 
        :readonly='readonly'>
      
      <button>
        {{ submitting ? 'Submitting' : 'Submit' }}
      </button>
      
    </template>
  </netlify-form>
  
</template>

<script>

export default {
  data: function() {
    form: {
      Email: ''
    }
  }
}

</script>
```

## Props

| Name | Default | Description |
| ---- | ------- | ----------- |
| `name` | _required_ | The name of the form.  This will be how the form shows up within the Netlify Forms dashboard |
| `form` | _required_ | The form data as key/value pairs.  This is what your form fields are updating on input.  You may want to title case the keys as these are what are displayed within the Netlify Forms dashboard |
| `endpoint` | `/` | Where the form should submit to.  On production, the form should POST to the root of your site.  While dev-ing locally, you may want to pass the hostname of your Netlify app here so you can post to it from your localhost.  This also reads from `process.env.NETLIFY_FORMS_ENDPOINT`. |

## Notes

#### CORS when using `endpoint`

If you're going to use the `endpoint` prop to submit to your production endpoint from localhost, you should add something like the following to `_headers` to allow those requests.

```
/
  Access-Control-Allow-Origin: http://localhost:3000
  Access-Control-Allow-Methods: POST
  Access-Control-Allow-Headers: content-type
```
