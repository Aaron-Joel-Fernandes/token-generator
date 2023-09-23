package com.arikolabs.generator;

import net.minidev.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Random;

@RestController
@RequestMapping("/api")
public class Generator {

@CrossOrigin("http://localhost:3000/")
@PostMapping("/createToken")
public JSONObject fetchNewToken(@RequestBody String str){

    //convert string to int array by using split
    String[] string = str.split(",");
    //get the allowed numbers replacing , with empty
    String allowedNumbers=str.replace(",","");
    int[] arr = new int[string.length];

    Random random = new Random();
    //create a token class
    StringBuilder token= new StringBuilder();
    //token format xxxx-xxxx-xxxx-xxxx
    for (int i = 0; i < 16; i++) {
        // Generate a random index to select a character from the allowedChars string
        int index = random.nextInt(allowedNumbers.length());
        char randomChar = allowedNumbers.charAt(index);
        token.append(randomChar);

        // Add dashes at the appropriate positions
        if (i == 3 || i == 7 || i == 11) {
            token.append('-');
        }


    }
    JSONObject obj=new JSONObject();
    obj.put("token",token.toString());
    return obj;
}

}
