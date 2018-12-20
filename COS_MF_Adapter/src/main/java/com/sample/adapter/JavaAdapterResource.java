/**
* Copyright 2016 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

package com.sample.adapter;

import org.apache.wink.json4j.JSONException;
import org.apache.wink.json4j.JSONObject;
import com.ibm.mfp.adapter.api.AdaptersAPI;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URL;
import java.util.*;
import java.text.*;
import java.lang.Object.*;
import java.net.URLEncoder;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import com.ibm.mfp.adapter.api.ConfigurationAPI;

@Path("/cos")
public class JavaAdapterResource {

	@Context
	ConfigurationAPI configurationAPI;
	
	AdaptersAPI adaptersAPI;

	/* Path for method: "<server address>/mfp/api/adapters/JavaAdapter/cos/" */
	@GET
	@Produces("text/plain")
	@Path("/")
	public String getAllObjects() throws JSONException {

		String COS_ENDPOINT;
		String IAM_TOKEN;
		String COS_BUCKET_NAME;
		String COS_HOST;
		String temp = "";
		String output = "";
		
		COS_ENDPOINT = configurationAPI.getPropertyValue("endpointURL");
		IAM_TOKEN = configurationAPI.getPropertyValue("oauthtoken");
		COS_BUCKET_NAME = configurationAPI.getPropertyValue("bucketName");
		COS_HOST = configurationAPI.getPropertyValue("host");
		try {
			DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
	        Date date = new Date();
			URL url = new URL(COS_ENDPOINT+"/"+ URLEncoder.encode(COS_BUCKET_NAME).replace("+","%20"));
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Authorization", IAM_TOKEN);
			conn.setRequestProperty("Content-Type", "text/plain");
			conn.setRequestProperty("Host",COS_HOST);
			conn.setRequestProperty("X-Amz-Date",dateFormat.format(date) );
			
			if (conn.getResponseCode() != 200) {
				output = output + "\nResponse message is : "+conn.getResponseMessage().toString();
			}
			else{
			BufferedReader br = new BufferedReader(new InputStreamReader(
					(conn.getInputStream())));

			System.out.println("Output from Server .... \n");
			while ((temp = br.readLine()) != null) {
					output = output + temp;
				}
			}
			conn.disconnect();

		} catch (MalformedURLException e) {
			output = e.toString();
			e.printStackTrace();
		} catch (IOException e) {
			output = e.toString();
			e.printStackTrace();
		}
		return output;
	}
	
	

	/* Path for method: "<server address>/mfp/api/adapters/JavaAdapter/cos/getObjectData/{objectname}" */
	@GET
	@Produces("text/plain")
	@Path("/getObjectData/{objectname}")
	public String getObject(@PathParam("objectname") String objectName ) throws JSONException {

		String COS_ENDPOINT;
		String IAM_TOKEN;
		String COS_BUCKET_NAME;
		String COS_HOST;
		String temp = "";
		String output = "";
		
		COS_ENDPOINT = configurationAPI.getPropertyValue("endpointURL");
		IAM_TOKEN = configurationAPI.getPropertyValue("oauthtoken");
		COS_BUCKET_NAME = configurationAPI.getPropertyValue("bucketName");
		COS_HOST = configurationAPI.getPropertyValue("host");
		try {
			DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
	        Date date = new Date();
			URL url = new URL(COS_ENDPOINT+"/"+ COS_BUCKET_NAME + "/" + URLEncoder.encode(objectName).replace("+", "%20"));
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Authorization", IAM_TOKEN);
			conn.setRequestProperty("x-amz-date",dateFormat.format(date) );
			conn.setRequestProperty("Host",COS_HOST);
			
			if (conn.getResponseCode() != 200) {
				output = output + "\nResponse message is : "+conn.getResponseMessage().toString();
			}
			else{
			BufferedReader br = new BufferedReader(new InputStreamReader(
					(conn.getInputStream())));

			System.out.println("Output from Server .... \n");
			while ((temp = br.readLine()) != null) {
					output = output + temp;
				}
			}
			
			conn.disconnect();

		} catch (MalformedURLException e) {
			output = e.toString();
			e.printStackTrace();
		} catch (IOException e) {
			output = e.toString();
			e.printStackTrace();
		}
		return output;
	}
	
	

	/* Path for method: "<server address>/mfp/api/adapters/JavaAdapter/cos/putObjectData/{objectname}" */
	@PUT
	@Produces("text/plain")
	@Path("/putObjectData/{objectname}/{story}")
	public String putObjectData(@PathParam("objectname") String objectName, @PathParam("story") String story ) throws JSONException {

		String COS_ENDPOINT;
		String IAM_TOKEN;
		String COS_BUCKET_NAME;
		String COS_HOST;
		String temp = "";
		String output = "";
		
		COS_ENDPOINT = configurationAPI.getPropertyValue("endpointURL");
		IAM_TOKEN = configurationAPI.getPropertyValue("oauthtoken");
		COS_BUCKET_NAME = configurationAPI.getPropertyValue("bucketName");
		COS_HOST = configurationAPI.getPropertyValue("host");
		try {
			DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
	        Date date = new Date();
			URL url = new URL(COS_ENDPOINT+"/"+ COS_BUCKET_NAME + "/" + URLEncoder.encode(objectName).replace("+", "%20"));
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("PUT");
			conn.setRequestProperty("Authorization", IAM_TOKEN);
			conn.setRequestProperty("x-amz-date",dateFormat.format(date) );
			conn.setRequestProperty("Host",COS_HOST);
			conn.setDoOutput(true);
			conn.setRequestMethod("PUT");
			OutputStreamWriter out = new OutputStreamWriter(
			    conn.getOutputStream());
			out.write(story);
			out.close();
			
			//output = "response code is : "+conn.getResponseCode()+"";
			if (conn.getResponseCode() != 200) {
				output = output + "\nResponse message is : "+conn.getResponseMessage().toString();
			}
			else{
			BufferedReader br = new BufferedReader(new InputStreamReader(
					(conn.getInputStream())));

			System.out.println("Output from Server .... \n");
			while ((temp = br.readLine()) != null) {
					output = output + temp;
				}
			}
			
			if(output== ""){
				output = "Story added successfully!!!";
			}
			
			conn.disconnect();

		} catch (MalformedURLException e) {
			output = e.toString();
			e.printStackTrace();
		} catch (IOException e) {
			output = e.toString();
			e.printStackTrace();
		}
		return output;
	}

}
