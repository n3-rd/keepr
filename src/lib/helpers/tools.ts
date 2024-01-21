import { browser } from "$app/environment";
import { getFirestore, doc, setDoc  } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/firebase";

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

export const saveArticleToLocalStorage = (article: article) => {
    if(browser) {
    const articles = getArticlesFromLocalStorage();
    articles.push(article);
    localStorage.setItem("n3rd.diary.articles", JSON.stringify(articles));
    }
    syncArticlesToFirestore();
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