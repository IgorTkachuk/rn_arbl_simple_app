import {
  View,
  Alert,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Post } from "../components/Post";
import axios from "axios";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";

export const HomeScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get("https://62e6a4d669bd03090f73e159.mockapi.io/articles")
      .then(({ data }) => setItems(data))
      .catch((err) => {
        console.log(err);
        Alert.alert("Ошибка", "Не удалось получить статьи");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(fetchPosts, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />
        }
        data={[...items]}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("FullPost", {
                id: item.id,
                title: item.title,
              })
            }
          >
            <Post
              title={item.title}
              createdAt={item.createdAt}
              imageUrl={item.imageUrl}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
