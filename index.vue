<!-- A wrapper for forms that submit to Netlify that adds required fields -->
<template lang='pug'>

form.netlify-form(
	data-netlify
	:name='name'
	:class="classes"
	:data-netlify-recaptcha='recaptcha'
	@submit.prevent='onSubmit')

	//- The form fields, scoped with variables from here
	slot(
		:readonly='readonly'
		:submitting='submitting'
		:reset='reset'
		:submitted='submitted')

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
export default
	props:
		# The form name
		name:
			type: String
			required: true
		# The form data
		form:
			type: Object
			required: true
		# The endpoint to post to
		endpoint:
			type: String
			default: -> process.env.NETLIFY_FORMS_ENDPOINT || '/'
		# Support recaptcha
		recaptcha:
			type: Boolean
			default: false

	data: ->
		submitting: false
		submitted: false
		recaptchaError: false

	computed:
		# Should fields be readonly
		readonly: -> @submitting or @submitted
		# Combine form data with Netlify-specific fields
		formData: -> { ...@form, 'form-name': @name }
		# The computed recaptcha field value
		classes: -> [
			if @recaptchaError then "recaptcha-error"
			if @submitted then "submitted"
		]

	# Check for valid input config when dev-ing
	mounted: ->
		if process.env.NODE_ENV != 'production'
		then setTimeout @validateInputs, 1000 # Wait for children to mount

	methods:
		# Check for named inputs for each form field like Netlify expects
		validateInputs: ->
			for key, val of @form
				unless @$el.querySelector "[name='#{key}']"
				then console.warn "Missing Netlify form field named: #{key}"

		# Submit to service
		onSubmit: ->
			return if @readonly
			@submitting = true

	 		# Fetch recaptcha token
			if @recaptcha
				try
					token = await @$recaptcha?.getResponse()
					@recaptchaError = false
				catch e
					# set recaptcha error and abort
					@submitting = false
					@recaptchaError = true
					@$emit 'error', "Recaptcha"
					return

	 		# Send form data to netlify
			try
				await @postToEndpoint(token)
				@submitting = false
				@submitted = true
				@$emit 'error', false
			catch e
				@$emit 'error', true
				@submitting = false

		# Do the actual post
		postToEndpoint: (recaptchaToken) ->
			data = new URLSearchParams({ ...@formData, "g-recaptcha-response": recaptchaToken }).toString()
			@$axios
				method: 'post'
				url: @endpoint
				data: new URLSearchParams({ ...@formData, "g-recaptcha-response": recaptchaToken }).toString()
				headers: 'content-type': 'application/x-www-form-urlencoded'

		# Reset form data back to initial state
		reset: ->
			@submitting = false
			@submitted = false

</script>
