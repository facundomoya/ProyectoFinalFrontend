import React from 'react';
import avatar1 from '../../img/avatar1.png'
import avatar2 from '../../img/avatar2.png'
import avatar3 from '../../img/avatar3.png'
import avatar4 from '../../img/avatar4.png'
import avatar5 from '../../img/avatar5.png'

const Nosotros = () => {
    return (
    <section className="text-center py-5 mt-5">
      <article className="container">
        <h1 className="display-2 pt-2">Acerca de nosotros</h1>
        <p className="lead">
          Somos un grupo de alumnos de RollingCode School, actualmente cursando la formación en Fullstack <br />
          Nos gusta la tecnología. En cada clase no solo aprendemos a
          programar sino que además somos instruidos en el uso de metodologías
          para gestionar proyectos de forma ordenadas y
          eficientes. Este es nuestro Proyecto Final del curso, el cual se trata de un diario digital llamado Rolling News.
        </p>
        </article>
        <section className="container py-2" id="galeria">
          <div className="row justify-content-md-center">
          <div class="col-sm-12 col-md-4 col-lg-2 py-5">
                <img src={avatar1} alt="avatar Maximiliano Cordoba" className='w-100' />
              <p className="lead pt-2">Maximiliano Córdoba</p>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-2 py-5">
                <img src={avatar2} alt="avatar Facundo Moya" className='w-100' />
              <p className="lead pt-2">Facundo Moya</p>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-2 py-5">
                <img src={avatar3} alt="avatar gonzalo cainzo" className='w-100' />
              <p className="lead pt-2">Gonzalo Cainzo</p>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-2 py-5">
                <img src={avatar4} alt="avatar gonzalo villafañe" className='w-100' />
              <p className="lead pt-2">Gonzalo Villafañe</p>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-2 py-5">
                <img src={avatar5} alt="avatar pablo dip" className='w-100' />
              <p className="lead pt-2">Pablo Dip</p>
            </div>
          </div>
        </section>
    </section>
    );
};

export default Nosotros;