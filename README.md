# Deployment

1. On remote repository delete the "gh-pages" branch. 

2. In you local repository run this command: `npm run build`

3. `git add dist -f`

4. `git commit -m [your commit message here]` 

5. `git subtree push --prefix dist origin gh-pages`

Or you can just use the automated script contained within the `scripts` directory. To do this execute the following:
```sh
chmod +x deploy         # allow the script executable permissions
./deploy                # execute the script
```
