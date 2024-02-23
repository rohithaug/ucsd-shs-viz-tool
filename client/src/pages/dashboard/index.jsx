// IMPORT COMPONENTS
import Layout from './components/layout';
import { MakeChart } from './components/chart';
import styles from './test.module.css';
 
const posts = [
  { name: "Post 1", time: new Date(2023, 11, 4), views: 100, viewTime: 10000, likes: 5, categories: new Set(["Odd", "Square"]) },
  { name: "Post 2", time: new Date(2023, 12, 11), views:222, viewTime: 33333, likes:90, categories: new Set(["Prime"]) },
  { name: "Third Post", time: new Date(2024, 1, 2), views:67, viewTime: 10000, likes:20, categories: new Set(["Odd", "Prime"]) },
  { name: "3 Because Zero Indexing", time: new Date(2024, 1, 24), views:543, viewTime: 5430, likes:-50, categories: new Set(["Square"]) },
  { name: "Definitely Post 1", time: new Date(2024, 2, 5), views:20, viewTime: 200, likes:-20, categories: new Set(["Odd", "Prime"]) },
  { name: "Valentines Day", time: new Date(2024, 2, 14), views: 994, viewTime: 964000, likes: 100, categories: new Set() },
  { name: "Valentines Day Part 2", time: new Date(2024, 2, 14), views: 94, viewTime: 85300, likes: 10, categories: new Set(["Odd", "Prime"]) },
  { name: "Valentines Day Part 3", time: new Date(2024, 2, 14), views: 45, viewTime: 4500, likes: 2, categories: new Set() },
  { name: "Valentines Day Part 4", time: new Date(2024, 2, 14), views: 19, viewTime: 1900, likes: 10, categories: new Set(["Odd", "Square"]) }
];
const categories = [{name: "Odd"}, {name: "Prime"}, {name: "Square"}];
const dateRanges = [{start: new Date(2023, 11, 1), stop: new Date(2023, 12, 1)},
                    {start: new Date(2023, 12, 1), stop: new Date(2024, 1, 1)},
                    {start: new Date(2024, 1, 1), stop: new Date(2024, 2, 1)},
                    {start: new Date(2024, 2, 1), stop: new Date(2024, 3, 1)}]

function postsWithCategory(inPosts, cat) {
  let result = []
  inPosts.forEach(post => {
      if (post.categories.has(cat.name)) {
          result.push(post)
      }
  });
  // inPosts.filter(post => post.categories.has(cat.name));
  // document.getElementById('out').innerHTML += cat.name;
  // document.getElementById('out').innerHTML += ":\n";
  // document.getElementById('out').innerHTML += result.length;
  // document.getElementById('out').innerHTML += "\n";
  return (result)
}
//   postsWithCategory(posts, {name: "Prime"})

function postsInDateRange(inPosts, start, stop) {
  let result = inPosts.filter(post => post.time > start && post.time < stop);
  // document.getElementById('out').innerHTML += result.length;
  // document.getElementById('out').innerHTML += "\n";
  return (result)
}

function totalPostsLikes(vals) {
  let likes = vals.map(val => val.likes);
  return (likes.reduce((a,b) => a+b))
}

function totalPostsViews(vals) {
  let sum = 0
  // return (views.reduce((a,b) => a+b))
  //doesn't work with postsInDateRange for some reason?
  //I don't know why not
  let views = vals.map(val => val.views);
  views.forEach(tot => {
      sum += tot;
  });
  return sum
}

function totalPostsViewTime(vals) {
  let sum = 0
  let viewTimes = vals.map(val => val.viewTime);
  viewTimes.forEach(tot => {
      sum += tot;
  });
  return sum
}

function viewsInDateRange(inPosts, start, stop) {
  let postSet = postsInDateRange(inPosts, start, stop);
  // views = postSet.map(val => val.views)
  // let sum = 0;
  // views.forEach(tot => {
  //     sum += tot;
  //     // document.getElementById('out').innerHTML += post;
  //     // document.getElementById('out').innerHTML += "\n";
  // });
  // return sum
  // document.getElementById('out').innerHTML += sum;
  // document.getElementById('out').innerHTML += "\n";
  // // views.reduce((a,b) => a+b)
  // // return totalPostsLikes(postSet)
  // return postSet
  return totalPostsViews(postSet)
}

export default function Page() {
  return (
    <div class={styles.graphWrapper} style={{width: "90%"}}>
      <MakeChart 
        chartType={"scatter"} 
        labels={"Likes"}
        datasets={[
          {
            label: 'Likes v Time',
            data: posts.map(post => ({
                x: post.time,
                y: post.likes
            })),
            showLine: true,
          }
        ]}
        timelike={true}
        title={'Likes Per Post'}/>
      {/* <MakeChart 
        chartType={"bar"} 
        labels={categories.map(cat => cat.name)}
        datasets={[
          {
            label: 'Likes',
            data:   categories.map(cat =>
                totalPostsLikes(postsWithCategory(posts, cat))
                )
          }
        ]}
        timelike={false}
        title={'Likes Per Category'}/>
      <MakeChart 
        chartType={"bar"} 
        labels={dateRanges.map(range => range.stop)}
        datasets={categories.map(cat => 
          (
              {
              label: cat.name,
              data:  dateRanges.map(range => totalPostsViews(postsWithCategory(postsInDateRange(posts, range.start, range.stop), cat))
                  )
              }
          )
      )}
        timelike={true}
        title={'Post Views Per Month'}/>
      <MakeChart 
        chartType={"doughnut"} 
        labels={categories.map(cat => cat.name)}
        datasets={[
          {
            data:   categories.map(cat =>
                totalPostsViewTime(postsWithCategory(posts, cat))
                )
          }
        ]}
        timelike={false}
        title={'Total Seconds Viewed'}/> */}
    </div>
  )
}
 
Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}