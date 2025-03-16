import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";

const App = () => {
  const [response, setResponse] = useState("");

  const uploadFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type !== "cancel") {
      let formData = new FormData();
      formData.append("file", {
        uri: result.uri,
        name: result.name,
        type: result.mimeType,
      });

      const endpoint =
        result.name.endsWith(".pdf")
          ? "http://127.0.0.1:8000/upload/pdf"
          : result.name.endsWith(".pptx")
          ? "http://127.0.0.1:8000/upload/ppt"
          : "http://127.0.0.1:8000/upload/mp4";

      let { data } = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResponse(data.ai_explanation);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={uploadFile}>
        <Text>Select and Upload File</Text>
      </TouchableOpacity>
      <Text>{response}</Text>
    </View>
  );
};

export default App;
