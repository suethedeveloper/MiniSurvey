# Mini Survey Engine



## Objective

- Each question consists of the actual question, and answer options (or in the case of a text input, the text field)
- Do not use any switch, if/else statements anywhere to distinguish between question types
- Code should be such that if a user wanted to add 100 more question types, a user can do it without refactoring code

## Notes

A very basic survey engine that runs solely in javascript / HTML. With the following properties:

	1. Must be fully object oriented. A full hierarchy should be architected to enable maximum extensibility in the future. Note that this is the most important aspect of the assignment. Polymorphism is the word of the day.
	
	2. It should not require any database or server side code.
	
	3. State does not need to be maintained beyond a browser refresh
	
	4. No user account is required
	
	5. Survey must support  all of the following question types:
		a. Radio button - composed of a question, 
			and any number of options, selectable 
			via a radio button
		b. check box - multi-select options
		c. drop down
		d. open-ended. text input
