import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import axios from "axios";
import { Loading } from "../components/Loading";

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-right: 20px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
  margin-top: 10px;
`;

export const FullPostScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const { id, title } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title,
    });
    setIsLoading(true);
    axios
      .get(`https://62e6a4d669bd03090f73e159.mockapi.io/articles/${id}`)
      .then(({ data }) => setData(data))
      .catch((err) => {
        console.log(err);
        Alert.alert("Ошибка", "Не удалось получить статьи");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={{ padding: 20 }}>
      <PostImage
        source={{
          uri: data.imageUrl,
        }}
      />
      <PostText>{data.text}</PostText>
    </View>
  );
};
