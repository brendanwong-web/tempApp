

---

# tempApp

This is a complete project for temperature logging in these pandemic times, with svelte3 and firebase. The logo is copyright of Learning Hearts Therap LLP.

## Get started developing

Install the dependencies...

```
npm install
```

...then start [Rollup](https://rollupjs.org):

```
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

### Config 

You will need to link your firebase app instead of mine. Replace the following:

In App.svelte and Submit.svelte:

``` 
fetch(`https://temp-70e0d.firebaseio.com/${uid}/temps.json`)
```

replace the link with your unique firebase realtime database link.



