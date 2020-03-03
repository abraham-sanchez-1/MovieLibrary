using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPISample.Data;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private ApplicationContext _context;
        public MovieController(ApplicationContext context)
        {
            _context = context;
        }
        // GET api/movie
        [HttpGet]
        public IEnumerable<Movie> Get()
        {
            return _context.Movies.ToList();
        }

        // GET api/movie/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie is null)
            {
                return NotFound();
            }
            return Ok(movie);
        }

        // POST api/movie
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Movie value)
        {
            // Create movie in db logic
            var newMovie = new Movie
            {
                Title = value.Title,
                Genre = value.Genre,
                Director = value.Director
            };
            _context.Movies.Add(newMovie);
            await _context.SaveChangesAsync();

            return Ok(newMovie);
        }

        // PUT api/movie/5
        [HttpPut]
        public async Task<IActionResult> Put(int id, [FromBody]Movie movie)
        {
            var updateMovie = _context.Movies.FirstOrDefault(m => m.MovieId == id);
            if (id != updateMovie.MovieId)
            {
                return BadRequest();
            }
            
            updateMovie.Title = movie.Title;
            updateMovie.Genre = movie.Genre;
            updateMovie.Director = movie.Director;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE api/movie/5
        //[HttpDelete]
        //public void Delete(int id)
        //{
        //    // Delete movie from db logic
        //}
        private bool MovieExists(int id) =>
            _context.Movies.Any(m => m.MovieId == id);
    }
}