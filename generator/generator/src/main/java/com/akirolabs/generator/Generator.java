package com.akirolabs.generator;

import net.minidev.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api")
public class Generator {
   // static Map map=new HashMap<Integer,String>();
   // static Integer counter=0;
@CrossOrigin("http://localhost:8080/")
@PostMapping("/createToken")
public JSONObject fetchNewToken(@RequestBody String str){

    //convert string to int array by using split
    String[] string = str.split(",");
    //get the allowed numbers replacing , with empty
    String allowedNumbers=str.replace(",","");
    int numberOfIntegers=allowedNumbers.length();
    long noOfCombinations=GeneratorHelper.calculateCombinations(16,numberOfIntegers);
    int[] arr = new int[string.length];
    Map values= new HashMap<String,Integer>();
    Random random = new Random();
    //create a token class
    //token format xxxx-xxxx-xxxx-xxxx
    for(int j= 0; j<noOfCombinations;j++){
        StringBuilder token= new StringBuilder();
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
        values.put(j,token);
    }
    JSONObject obj=new JSONObject();
    //counter+=1;
   // map.put(counter,token.toString());
    obj.put("tokens",values);
    return obj;
}

}
