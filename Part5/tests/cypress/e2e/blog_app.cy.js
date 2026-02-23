const userSample = {
  name: 'Arto Hellas',
  username: 'hellas',
  password: 'HellasArto'
}

const userSample2 = {
  name: 'Shayan Rashidi',
  username: 'Shayan',
  password: 'RashidiShayan'
}

const blogSample = {
  title: 'Understanding JavaScript Closures',
  author: 'John Doe',
  url: 'https://example.com/js-closures',
  likes: 10
}

const blogSample2 = {
  title: "Learning Cypress for Fun and Profit",
  author: "Jane Doe",
  url: "https://janedoe.dev/cypress-guide",
  likes: 20
}

describe('Blog app', () => {
  // Visit the frontend
  beforeEach(function() {
    // First clear the database in testing
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    // The create a user for api/users
    cy.request('POST', 'http://localhost:3003/api/users/', userSample)
    // Then visit the main localhost
    cy.visit('http://localhost:5173')
  })

  // Test whether it shows the full login details or not
  it('Login form is show', function() {
    cy.contains('Log in to application')
    cy.contains('label', 'username')
    cy.contains('label', 'password')
    cy.contains('button', 'login')
  })
  
  // Now test a user logging in
  describe('Login',function() {
    // With the correct credentials
    it('succeeds with correct credentials', function() {
      // Enter a correct credentials
      cy.contains('label', 'username').type(userSample.username)
      cy.contains('label', 'password').type(userSample.password)
      // Click the login button
      cy.contains('button', 'login').click()
      
      // Make sure it shows the correct information once logged in successfully
      cy.contains(`${userSample.name} logged in`)
      cy.contains('button', 'logout')
      
    })
    
    // With the incorrect credentials
    it('fails with wrong credentials', function() {
      cy.contains('label', 'username').type('Hellas')
      cy.contains('label', 'password').type('HellasArto')
      cy.contains('button', 'login').click()
      // When the username and password is wrong, it must show "incorrect value"
      cy.get('.error')
      .should('contain', 'wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    })
  })
  
  describe('When logged in', function() {
    beforeEach(function() {
    // First clear the database in testing
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    // The create a user for api/users
    cy.request('POST', 'http://localhost:3003/api/users/', userSample)
    cy.request('POST', 'http://localhost:3003/api/users/', userSample2)
    // Then visit the main localhost
    cy.visit('http://localhost:5173')
    
    // Then do the login and create a blog
    // The blogs are created by the first sample
    cy.login({ username: userSample.username, password: userSample.password })
    cy.createBlog({ title: blogSample.title, author: blogSample.author, url: blogSample.url, likes: blogSample.likes })
    cy.createBlog({ title: blogSample2.title, author: blogSample2.author, url: blogSample2.url, likes: blogSample2.likes })

    
    })
    
    it('A blog can be created', function() {
      // Then enter the username and password and click the login button
      cy.login({ username: userSample2.username, password: userSample2.password })

      // First click on the create new blog button
      cy.contains('button', 'create new blog').click()
      
      // Then enter the details of the blog and clicking on the button
      cy.contains('label', 'title').type('Machine Learning Basics for Beginners')
      cy.contains('label', 'author').type('Alex Chen')
      cy.contains('label', 'url').type('https://www.mlguide.com/basics')
      
      cy.get('form').submit()
    })
    
    it('A user that creates a blog can like it', function() {
      // Then enter the username and password and click the login button
      cy.login({ username: userSample2.username, password: userSample2.password })

      // First click on the create new blog button
      cy.createBlog({ title: 'Traveling Europe on a Budget', author: 'Emily Johnson', url: 'https://www.travelwise.com/europe-budget', likes: 0 })

      cy.contains('.blog-to-show', 'Traveling Europe on a Budget').parent().contains('view').click()
      cy.contains('.blog-to-show', 'Traveling Europe on a Budget').parent().contains('like').click()
      cy.contains('likes 1')
    })
    
    it('A user that creates the blog can delete it', function() {
      // Login and enter the username and password 
      cy.login({ username: userSample.username, password: userSample.password })

      // Create the blog and get its ID
      cy.createBlog({ title: '10 Tips for Healthy Eating', author: 'Mark Smith', url: 'https://www.healthblog.com/healthy-eating-tips', likes: 0 })

        cy.contains('.blog-to-show', '10 Tips for Healthy Eating').parent().contains('view').click()
        cy.contains('.blog-to-show', '10 Tips for Healthy Eating').parent().contains('remove').click()

        // Optional assertion
        cy.contains('.blog-to-show', '10 Tips for Healthy Eating').should('not.exist')
    })

    it('Only the user that created the blog can delete it', function() {
      // Then enter the username and password and click the login button
      cy.login({ username: userSample2.username, password: userSample2.password })
      
      cy.contains(blogSample2.title)
      .parent()
      .contains('view').click()
      
      cy.contains(blogSample2.title)
      .parent()
      .contains('remove').should('not.exist')
    })
    
    it('The blogs are ordered by likes, from most to least', function() {
      // Then enter the username and password and click the login button
      cy.login({ username: userSample2.username, password: userSample2.password })
      
      cy.get('.blog-to-show').eq(0).should('contain', blogSample2.title, { timeout: 10000 })
      cy.get('.blog-to-show').eq(1).should('contain', blogSample.title, { timeout: 10000 })
    })
  })
})