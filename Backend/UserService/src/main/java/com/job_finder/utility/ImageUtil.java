package com.job_finder.utility;

import java.io.IOException;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

public class ImageUtil {
	 public static byte[] compressImage(byte[] imageData) throws IOException {
	        Deflater deflater = new Deflater();
	        deflater.setInput(imageData);

	        // Create a byte array to hold the compressed data
	        byte[] compressedData = new byte[imageData.length];
	        deflater.finish();

	        int compressedSize = deflater.deflate(compressedData);

	        byte[] result = new byte[compressedSize];
	        System.arraycopy(compressedData, 0, result, 0, compressedSize);

	        return result;
	    }

	    public static byte[] decompressImage(byte[] compressedData) throws IOException, DataFormatException {
	        Inflater inflater = new Inflater();
	        inflater.setInput(compressedData);

	        // Create a byte array to hold the decompressed data
	        byte[] decompressedData = new byte[compressedData.length * 2];

	        int decompressedSize = inflater.inflate(decompressedData);

	        byte[] result = new byte[decompressedSize];
	        System.arraycopy(decompressedData, 0, result, 0, decompressedSize);

	        return result;
	    }

	    // Other image-related utility methods can be added here
	}