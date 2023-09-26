package com.akirolabs.validator;

import com.fasterxml.jackson.core.type.TypeReference;
import net.minidev.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api")
public class Validator {

    @CrossOrigin("http://localhost:8080/")
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
        
        JSONObject object= new JSONObject();
        if ((lastDigit==0 && sum%10==0) || (10-sum%10)==lastDigit){
            object.put("validToken",true);
            return object;
        } else{
            object.put("validToken",false);
            return object;
        }

    }


    @CrossOrigin("http://localhost:8080/")
    @PostMapping("/validate")
    public JSONObject isValidTokens(@RequestBody String tokensStr) {
        JSONObject object = new JSONObject();
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<Integer, String> tokens = objectMapper.readValue(tokensStr, new TypeReference<Map<Integer, String>>() {});

            for(Integer j=0;j<tokens.size();j++) {
                String cardNumber= tokens.get(j);
                String token= tokens.get(j);
                token = token.replaceAll("-", "");
                Long tokenNumber = Long.parseLong(token);
                int lastDigit = (int) (tokenNumber % 10);
                // drop last digit
                int len = token.length();
                boolean alternate = true;
                int sum = 0;
                for (int i = len - 2; i >= 0; i--) {
                    int digit = Character.getNumericValue(token.charAt(i));

                    if (alternate) {
                        digit *= 2;

                        if (digit > 9) {
                            digit -= 9;
                        }
                    }

                    sum += digit;
                    alternate = !alternate;
                }
        
                if ((lastDigit == 0 && sum % 10 == 0) || (10 - sum % 10) == lastDigit) {
                    object.put(cardNumber, true);
                } else {
                    object.put(cardNumber, false);
                }
            }
        }
        catch (Exception e) {
            // Handle other exceptions
            e.printStackTrace();
        }
        return object;

    }
}