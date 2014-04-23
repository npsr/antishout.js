/* 
 * !AntiShout.js
 * =============================================================================
 * 
 * Dissalow to send text form written with CAPS LOCK on.
 * STOP SHOUT TO ME!!!
 * 
 * @date: 04.2014
 * @author: Luke Samorodny 
 * @contact: kontakt.samorodny@gmail.com
 * @licence: GPL v.3 or higher
 * 
 * =============================================================================
 * 
 * @usage:
 * 
 * - Simple:
 * $(formSelector).antishout()
 * 
 * - With options:
 * 
 * var options = {
 *      // Messages *	    
 *      toMuchUpperCased    : 'Too much uppercased letters!',
 *      
 *      // How much percent of uppercase can be in the string
 *      upperCaseRatio      : 30,
 *      
 *      // Form elements listen
 *      listen              : {
 *                              textInput   : true,
 *                              textarea    : true
 *                            },
 *                            
 *      // Set minimum characters
 *      minChars            : {
 *                              textInput   : 6,
 *                              textarea    : 100
 *                            }
 * }
 * 
 * $(formSelector).antishout(options)
 * 
 */

;(function(defaults, $, window, document, undefined) {

	'use strict';

	$.extend({

		pluginSetup : function(options) 
		{
			return $.extend(defaults, options);
		}

	}).fn.extend({

		/**
		 * Antishout public function
		 * =====================================================================
		 * 
		 * @usage: $(selector).antishout({property:'value'});
		 */		 
		antishout : function(options) 
		{

			options = $.extend({}, defaults, options);

			return $(this).each(function() 
			{
				
				/**
				 * Define some elements
				 * =============================================================
				 * 
				 * @type array
				 */
				var $$ = {
				  form              : $(this),
				  alertBox          : $(this).find('.message'),
				  i                 : 0,
				  uCLetters         : 0,
				  uCLettersRatio    : 0                  
				};          

				/**
				 * Check is ratio UpperCase to LowerCase allowed
				 * =============================================================
				 * 
				 * @param {string} string
				 * @returns {Boolean}
				 */
				function checkUppercaseRatio(string)
				{
					$$.uCLetters        = string.replace(/[^A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]/g, "").length;
					$$.uCLettersRatio   = 100 * $$.uCLetters / $$.i;                   
					
					return ($$.uCLettersRatio < options.upperCaseRatio) ? true : false;                    
				};

				/**
				 * Display message
				 * =============================================================
				 * 
				 * @param {string} alert
				 */
				function showAlert(alert)
				{
					$$.alertBox.text(alert).show();
				}
				
				/**
				 * Hide message
				 * =============================================================
				 */
				function clearAlert()
				{
					$$.alertBox.text('').hide();
				}
				
				 /**
				 * Unlock submit button
				 * =============================================================
				 */
				function unlockSubmit()
				{
					$$.form.find('[type="submit"]').removeAttr('disabled');
				}
				
				/**
				 * Lock submit button back
				 * =============================================================
				 */
				function lockSubmit()
				{
					$$.form.find('[type="submit"]').attr('disabled', 'disabled');
				}
				
				/**
				 * Start listen text input
				 * =============================================================
				 */ 
				
				function listen(element, minChars) {                                 
					
					$$.form.find(element).each(function()
					{
						var $this = $(this);                        
						
						$this.on('keyup', function()
						{
							$$.i = $this.val().length;
							
							if($$.i >= minChars) {
								setTimeout(function()
								{
									if(!checkUppercaseRatio($this.val())) {                              
										showAlert(options.toMuchUpperCased); 
										lockSubmit();
									} else {
										clearAlert();
										unlockSubmit();
									}    
								}, 100);                                                          
								
							} else {
								clearAlert();
								lockSubmit();
							}
						});
					});
				}
				
				if(options.listen.textInput) { 
					listen('input[type="text"]', options.minChars.textInput);
				}
				
				if(options.listen.textarea) { 
					listen('textarea', options.minChars.textarea);
				}    
				
			});
		}
	});
})({
	
		// Messages	    
		toMuchUpperCased    : 'Too much uppercased letters!',
		
		// How much percent of uppercase can be in the string
		upperCaseRatio      : 30,
		
		// Form elements listen
		listen              : {
								textInput   : true,
								textarea    : true
							  },
							  
		// Set minimum characters
		minChars            : {
								textInput   : 6,
								textarea    : 100
							  }	
		
}, jQuery, window, document);