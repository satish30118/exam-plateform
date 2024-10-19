import React from 'react'

const Question = () => {
    return (
        <div><h2 className="text-xl font-bold">Question 5: </h2>
            <hr className="my-4" />
            <div className='ml-3  flex flex-col justify-between'>
                <div>
                    <p className="text-lg mb-4">What is the c Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, fugit, repellat suscipit nulla optio omnis nesciunt cupiditate quis nemo nostrum quae sunt itaque fugiat illo, ullam aperiam rem? Aperiam reprehenderit voluptates repudiandae officia ipsum maxime id, quidem minima tenetur. Earum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, ex esse atque inventore, cumque tempora nihil molestias quisquam, facere possimuma hic, quia repellendus unde laboriosam dolor, velit alias mollitia aperiam placeat quam ut magnam eos, culpa dolores molestiae.</p>
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