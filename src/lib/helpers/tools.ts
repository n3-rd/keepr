import { browser } from "$app/environment";
import { getFirestore, doc, setDoc, getDoc  } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/firebase";
import { failure } from "./Toast";

/**
 * initialize firebase
 */
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);




/**
 * date type, used for article list
 */
export type date = {
    day: number;
    month: number;
    year: number;
};

/**
 * article type, used for article list
 */
export type article = {
    title: string;
    content: string;
    date: date;
    id: number;
};

/**
 * save article to local storage
 * @param article article to be saved
 */

export const saveCurrentArticleToLocalStorage = (article: article) => {
    if(browser) {
    localStorage.setItem("n3rd.diary.currentArticle", JSON.stringify(article));
    }
}
export const emptyCurrentArticleFromLocalStorage = () => {
    if(browser) {
    localStorage.removeItem("n3rd.diary.currentArticle");
    }
}

export const saveArticleToLocalStorage = (article: article) => {
    if(browser) {
        if(article.content.length > 0 && article.title.length > 0) {
    const articles = getArticlesFromLocalStorage();
    articles.push(article);
    localStorage.setItem("n3rd.diary.articles", JSON.stringify(articles));
    syncArticlesToFirestore();
    emptyCurrentArticleFromLocalStorage();
        }
        else{
            failure('Please fill in all fields')
        }
}

}

/**
 *  get articles from local storage
 * @returns articles from local storage
 */
export const getArticlesFromLocalStorage = () => {
    if(browser) {
    const articles = localStorage.getItem("n3rd.diary.articles");
    return articles ? JSON.parse(articles) : [];
    }
}

export const determineNextID = () => {
    const articles = getArticlesFromLocalStorage();
    return articles.length + 1;
}

export const syncArticlesToFirestore = async () => {
    const articles = getArticlesFromLocalStorage();
    const docRef = doc(db, "articles", "articles");
    await setDoc(docRef, {articles});
}

export const syncArticlesFromFirestore = async () => {
    const docRef = doc(db, "articles", "articles");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const articles = docSnap.data().articles;
        localStorage.setItem("n3rd.diary.articles", JSON.stringify(articles));
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}


export const sync = async () => {
    try {
        await syncArticlesFromFirestore();
        await syncArticlesToFirestore();
    } catch (error) {
    failure('Error syncing articles, check your internet connection');
    }
};