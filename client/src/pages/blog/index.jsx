// IMPORT COMPONENTS
import Layout from './components/layout';

export default function StudentHealthBlogPost() {
  return (
    <div className="blog-post">
      <h2>5 Essential Health Tips for Students</h2>
      <p>
        As a student, maintaining good health is essential for academic success and overall well-being.
        Here are 5 tips to help you stay healthy and focused throughout the school year:
      </p>
      <ol>
        <li>
          <strong>Get Enough Sleep:</strong> Aim for 7-9 hours of sleep per night to recharge your body and mind.
          Establish a consistent sleep schedule and create a relaxing bedtime routine to improve sleep quality.
        </li>
        <li>
          <strong>Eat a Balanced Diet:</strong> Fuel your body with nutritious foods that provide energy and support
          brain function. Incorporate plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats into your meals.
          Avoid excessive consumption of processed foods, sugary snacks, and caffeine.
        </li>
        <li>
          <strong>Stay Active:</strong> Regular physical activity is essential for maintaining physical and mental health.
          Find activities you enjoy, such as walking, jogging, swimming, or yoga, and aim for at least 30 minutes of exercise
          most days of the week.
        </li>
        <li>
          <strong>Manage Stress:</strong> Academic and personal pressures can take a toll on your mental health.
          Practice stress management techniques like deep breathing, meditation, or journaling to reduce stress levels
          and promote relaxation.
        </li>
        <li>
          <strong>Stay Hydrated:</strong> Drink plenty of water throughout the day to stay hydrated and support
          bodily functions. Carry a reusable water bottle with you and aim to drink at least 8 glasses of water
          daily.
        </li>
      </ol>
      <p>
        By prioritizing your health and well-being, you can enhance your academic performance, boost your
        mood, and enjoy a fulfilling college experience.
      </p>
    </div>
  );
}

StudentHealthBlogPost.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
