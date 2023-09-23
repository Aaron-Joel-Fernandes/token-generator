package com.arikolabs.validator;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class Validator {

    @CrossOrigin("http://localhost:3000/")
    @GetMapping("/validate/{token}")
        public boolean isValid(@PathVariable String token) {
        token = token.replaceAll("-", "")   ;
        Long tokenNumber = Long.parseLong(token);
        int lastDigit = (int)(tokenNumber % 10);
        // drop last digit
        int len= token.length();
        boolean alternate=true;
        int sum = 0;
        for (int i = len - 2 ; i >= 0; i--) {
            int digit = Character.getNumericValue(token.charAt(i));

            if (alternate) {
                digit *= 2;

                if (digit > 9) {
                    digit -=9 ;
                }
            }

            sum += digit;
            alternate = !alternate;
        }
        System.out.println("Sum is"+sum);
        System.out.println("last digit is"+lastDigit);
        if( (lastDigit==0 && sum%10==0) || (10-sum%10)==lastDigit){
        return true;
        } else{
          return  false;
        }

    }
}