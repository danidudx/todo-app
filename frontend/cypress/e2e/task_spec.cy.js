describe("Task Management E2E Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Creates a new task", () => {
    // Create a task
    cy.get('input[name="title"]').type("Test Task");
    cy.get('textarea[name="description"]').type("Test task description");
    cy.get('button[type="submit"]').click();

    // Verify the task appears
    cy.contains("Test Task").should("exist");
    cy.contains("Test task description").should("exist");
  });

  it("Marks a task as completed", () => {
    // Create a task
    cy.get('input[name="title"]').type("Task to complete");
    cy.get('textarea[name="description"]').type("This task will be completed");
    cy.get('button[type="submit"]').click();

    // Click the 'Done' button
    cy.contains("button", "Done").first().click();

    // Verify the task is marked as completed
    cy.contains("Completed").should("exist");
  });

  it("Delete Task", () => {
    const taskTitle = "Test Task for Deletion";
    const taskDescription = "This task will be deleted";

    //  Create the task
    cy.get('input[name="title"]').type(taskTitle);
    cy.get('textarea[name="description"]').type(taskDescription);
    cy.get('button[type="submit"]').click();

    // Verification
    cy.contains(taskTitle).should("exist");
    cy.contains(taskDescription).should("exist");

    cy.contains(taskTitle)
      .parent()
      .contains(taskDescription)
      .parent()
      .parent()
      .find(".text-red-600.cursor-pointer.text-xl")
      .click();
    // Click the delete icon

    // Verify the task is deleted
    cy.contains(taskTitle).should("not.exist");
  });
});
