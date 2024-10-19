import React from 'react'

const Question = () => {
    return (
        <div><h2 className="text-xl font-bold">Question 5: </h2>
            <hr className="my-4" />
            <div className='ml-3  flex flex-col justify-between'>
                <div>
                    <p className="text-lg mb-4">What is the c Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, fugit, repellat suscipit nulla optio omnis nesciunt cupiditate quis nemo nostrum quae sunt itaque fugiat illo, ullam aperiam rem? Aperiam reprehenderit voluptates repudiandae officia ipsum maxime id, quidem minima tenetur. Earum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, ex esse atque inventore, cumque tempora nihil molestias quisquam, facere possimus dolor voluptatibus. Impedit similique ut numquam distinctio aut, at, totam dolores, ad dolorum doloribus et blanditiis. Asperiores facere quod saepe. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae repellat vel sunt fugiat hic totam quasi odit laborum neque dicta itaque obcaecati, similique dolores tempore repellendus officiis distinctio ipsam natus at quisquam. Omnis excepturi qui saepe obcaecati alias et? Suscipit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, voluptatum aperiam facere reiciendis quas, inventore, odio omnis tempora et amet esse? Inventore natus repellendus odio! Nesciunt maiores ipsam consequuntur itaque doloribus minima hic, quia repellendus unde laboriosam dolor, velit alias mollitia aperiam placeat quam ut magnam eos, culpa dolores molestiae.</p>
                    <div className="space-y-2">
                        <label className="block">
                            <input type="radio" name="question-5" /> New Delhi
                        </label>
                        <label className="block">
                            <input type="radio" name="question-5" /> Mumbai
                        </label>
                        <label className="block">
                            <input type="radio" name="question-5" /> Kolkata
                        </label>
                        <label className="block">
                            <input type="radio" name="question-5" /> Chennai
                        </label>
                    </div>
                </div>
            </div></div>
    )
}

export default Question