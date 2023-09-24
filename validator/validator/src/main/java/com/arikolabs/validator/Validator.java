package com.arikolabs.validator;

import com.fasterxml.jackson.databind.util.JSONPObject;
import net.minidev.json.JSONObject;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class Validator {

    @CrossOrigin("http://localhost:3000/")
    @GetMapping("/validate/{token}")
        public JSONObject isValid(@PathVariable String token) {
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
         JSONObject object= new JSONObject();
        if( (lastDigit==0 && sum%10==0) || (10-sum%10)==lastDigit){
            object.put("validToken",true);
            return object;
        } else{
            object.put("validToken",false);
            return object;
        }

    }
}