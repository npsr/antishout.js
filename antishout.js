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
 *      // Messages
 *	capsLockOnAlert     : 'Your caps lock is on! Please disable it!',
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
                  keyCode           : false,
                  shiftKey          : false,
                  i                 : 0,
                  uCLetters         : 0,
                  uCLettersRatio    : 0,
                  lock              : true
                };               
                
                /**
                 * Check is caps lock on
                 * =============================================================
                 * 
                 * @param {event} e
                 * @returns {Boolean|$$.shiftKey}
                 */
                function capsLock(e) 
                {                                    
                    $$.keyCode      = e.keyCode ? e.keyCode : e.which;
                    $$.shiftKey     = e.shiftKey ? e.shiftKey : (($$.keyCode == 16) ? true : false);
                    return ((($$.keyCode >= 65 && $$.keyCode <= 90) && !$$.shiftKey) || (($$.keyCode >= 97 && $$.keyCode <= 122) && $$.shiftKey));
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
                    $$.uCLetters        = string.replace(/[^A-Z]/g, "").length;
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
                        
                        $this.on('keydown', function(e)
                        {                            
                            if(capsLock(e)) {
                                showAlert(options.capsLockOnAlert); 
                                $$.lock = true;
                            } else {
                                clearAlert();
                                $$.lock = false;
                            }                    
                        });
                        
                        $this.on('keyup', function()
                        {
                            $$.i = $this.val().length;
                            
                            if($$.i >= minChars) {
                                if(!checkUppercaseRatio($this.val())) {                              
                                    showAlert(options.toMuchUpperCased); 
                                    $$.lock = true;
                                } else {
                                    clearAlert();
                                    $$.lock = false;
                                }
                                
                                if(!$$.lock) {
                                    unlockSubmit();
                                } else {
                                    lockSubmit();
                                }
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
	    capsLockOnAlert     : 'Your caps lock is on! Please disable it!',
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