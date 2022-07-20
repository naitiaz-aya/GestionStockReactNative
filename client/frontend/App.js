import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator, 
  Platform,
  SafeAreaView
 
} from "react-native";
import { Surface, Title, TextInput } from "react-native-paper";
import ModalView from "./src/components/ModalView";
import PostCardItem from "./src/components/ProductCard";


const url = "http://f7e2-41-250-55-90.ngrok.io/";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export default function App() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [postId, setPostId] = useState(0);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    setLoading(true);
    await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((e) => console.log(e));
    setLoading(false);
  };

  const addPost = async () => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ name, price }),
      });
      const newData = await res.json();
      setData([...data, newData]);
      setVisible(false);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

//   const editPost = async (postId, name, price) => {
//     try {
//       await fetch(url + `/${postId}`, {
//         method: "PUT",
//         headers,
//         body: JSON.stringify({
// 			name: name,
// 			price: price,
//         }),
//       })
//         .then((res) => res.json())
//         .then((responseData) => {
// 			AlertIOS.alert(
// 				"Put Response",
// 				"Response Body -> " + responseData
// 			)})
//         .catch((e) => {
//           console.log(e);
//         });
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const deletePost = async (postId) => {
//     setLoading(true);
//     try {
//       await fetch(url + `/${postId}`, {
//         method: "DELETE",
//     	headers,
//       })
// 	  .then(result=>result.json())
//         .then((resJson) => {
//           console.log("deleted:", resJson);
//           getPosts();
//         })
//         .then((result) => console.log(result=>result.json() + " ana hna"))
//         .catch((e) => {
//           console.log(e);
//         });
//     } catch (e) {
//       console.log(e);
//     }
//     setLoading(false);
//   };

  // const deletePost = (postId) => {
  //   fetch(url + `/${postId}`, {
  //     method: "DELETE",
  //     headers,
  //   }).then((res) => res.json())
  //     .then(resJson => {
  //       console.log('delete:', resJson)
  //       getPosts()
  //     }).catch(e => { console.log(e) })
  // }

//   const updatePost = () => {
//     getPosts();
//     setVisible(false);
//     setPrice("");
//     setName("");
//     setPostId(0);
//   };

//   const edit = (id, name, price) => {
//     setVisible(true);
//     setPostId(id);
//     setName(name);
//     setPrice(price);
//   };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Surface style={styles.header}>
        <Title style={styles.textHeader}>All Products</Title>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisible(true)}
        >
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
      </Surface>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id + index.toString()}
        refreshing={loading}
        onRefresh={getPosts}
        renderItem={({ item }) => (
          <PostCardItem
            name={item.name}
            price={item.price+ "$"}
            // onEdit={() => edit(item.id, item.name, item.price)}
            // onDelete={() => deletePost(item.id)}
          />
        )}
      />
      <ModalView
        visible={visible}
        name="Add Product"
        onDismiss={() => setVisible(false)}
        onSubmit={() => {
        //   if (postId && name && price) {
        //     editPost(postId, name, price);
        //   } else {
            addPost(name, price);
        //   }
        }}
        cancelable
      >
        <TextInput
          style={styles.input}
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          mode="outlined"
        />
        <TextInput
          label="Price"
          value={price}
          onChangeText={(text) => setPrice(text)}
          mode="outlined"
        />
      </ModalView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },textHeader:{
	fontSize: 30,
	fontWeight: 'bold',
  },
  header: {
    marginTop: Platform.OS === "android" ? 24 : 0,
    padding: 16,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "steelblue",
  },
  buttonText: {
    color: "white",
  },
  input: {
    color: "white",
  },
});
