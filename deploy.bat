
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:z1959529532/zys_notes.git master:gh-pages