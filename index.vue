<!-- A wrapper for forms that submit to Netlify that adds required fields -->

<template lang='pug'>

form.form-netlify(
	data-netlify
	:name='name'
	@submit.prevent='onSubmit')

	//- The form fields, scoped with variables from here
	slot(
		:readonly='readonly'
		:submitting='submitting'
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

	data: ->
		submitting: false
		submitted: false

	# Check for valid input config when dev-ing
	mounted: ->
		if process.env.NODE_ENV != 'production'
		then setTimeout @validateInputs, 1000 # Wait for children to mount

	computed:

		# Should fields be readonly
		readonly: -> @submitting or @submitted

		# Combine form data with Netlify-specific fields
		formData: -> { ...@form, 'form-name': @name }

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
			try await @postToEndpoint()
			catch e then return @submitting = false
			@submitting = false
			@submitted = true

		# Do the actual post
		postToEndpoint: -> @$axios
			method: 'post'
			url: @endpoint
			data: new URLSearchParams(@formData).toString()
			headers: 'content-type': 'application/x-www-form-urlencoded'

</script>
