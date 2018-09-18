# Accordion Wizard

A jQuery plugin that helps you create an accordian style wizard form.

[Usage](#usage) \
[Event hooks](#event-hooks) \
[External methods](#external-methods) \
[Demo](#demo)

#### Why a wizard?

Wizard forms help break down long forms to smaller chunks containing relatable questions. Autoscrolling enhances usability by scrolling the next step into view. Animation allows users to visually track where they went and where from.

#### When are wizards no good?

Wizards tend to be less user friendly when updating existing data, for example when using as a CRUD form. This is because users have to first navigate through steps to find their field, edit and go through all steps to save again. For this reason I included an 'edit' mode which will load the form with all steps expanded.

## Usage

1. Include jQuery:

	```html
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="jquery.accordian-wizard.min.js"></script>
	```

3. Create markup:

	```html
	<form id="element">

	    <!-- Step 1 -->
		<div data-acc-step>
			<div data-acc-title>Name &amp; Email</div>

			<label>Name:</label>
			<input type="text" name="name" />

			<label>Email:</label>
			<input type="text" name="email" />
		</div>

		<!-- Step 2 -->
		<div data-acc-step>
			<div data-acc-title>Contact</div>

			<label>Telephone:</label>
			<input type="text" name="telephone" />

			<label>Mobile:</label>
			<input type="text" name="mobile" />
		</div>

		<!-- Step 3 -->
		<div data-acc-step>
			<div data-acc-title>Payment</div>

			<label>Credit card:</label>
			<input type="text" name="card">

			<label>Expiry:</label>
			<input type="text" size="4" name="expiry">
		</div>

	</form>
	```

3. Call the plugin:

	```javascript
	$("#element").accWizard(options);
	```

## Options

**start** (int, default 1) \
The desired starting step

**mode** (string, "wizard" || "edit", default "wizard") \
Edit mode will automatically expand all steps and remove autoButtons, useful as a CRUD form editing existing data.

**enableScrolling** - (bool, default true) \
Upon step navigation, the window will scroll to the new step.

**scrollPadding** - (int, default 5) \
The px value negative offset when a new step scrolls into view. Only when enableScrolling is true.

**autoButtons** - (bool, default true) \
The plugin will automatically add next buttons (apart from the last step where it will add a submit) and previous buttons (apart from the first step). If disabled, you can use the data attributes (```data-acc-btn-next``` and ```data-acc-btn-prev```) to assign your own buttons.

**autoButtonsPrevClass** - (string, default empty) \
Additional classes to add to the previous button.

**autoButtonsNextClass** - (string, default empty) \
Additional classes to add to the next button.

**autoButtonsShowSubmit** - (bool, default true) \
Choose whether the plugins also creates the submit button.

**autoButtonsSubmitText** - (string, default "Submit") \
The text for the auto generated submit button.

**autoButtonsEditSubmitText** - (string, default "Save") \
The text for the auto generated submit button when in 'edit' mode.

**stepNumbers** - (bool, default true) \
If true the plugin will create the step numbers for you. You will need to add the ```data-acc-title``` attribute to each title element.

**stepNumberClass** - (string, default empty) \
Any additional classes for the step number. It will add 'acc-step-number' anyway.

## Event hooks

**beforeNextStep** - ```function(currentStep){}``` \
Triggered when someone clicks 'next' button.

**onSubmit** - ```function(element){}``` \
Triggered upon form submission.

## External methods

**activateNextStep** \
```$('#element').data('plugin_accordian_wizard').activateNextStep()```

Would you like any more hooks, functions or configuration options? Let me know.

## Demo

[Demo](https://williamabbott.github.io/accordion-wizard)